const Logger = require("../logger");
const { TE, to } = require("../services/util.service");
const { About } = require("../auth_models");
const { STRINGS } = require("../utils/appStatics.js");
const { WEBSITE_URL } = require('../config/config');
const { BASE_URL } = require("../config/config");
const lodash = require('lodash')

module.exports.editAbout = async (params) => {
    //Logger.info(paramsaa)
    let err, ab, er, image;
    [err, ab] = await to(About.findOne({}));
    if (err) TE(err.message);
    Logger.info(params.image)
    Logger.info(params)
    
    
    if (params.image) {
        if (params.image.length > 0) {
            let img = []
            Logger.info("sheenam",ab)
            img = (ab===null)?[]:ab.image;
            Logger.info("img", img);
             await to(Promise.all(params.image.map(async i => {
                let k = i.path ? i.path : null;
                Logger.info("2")   
                if (k !== null) {
                    Logger.info("1",k);
                     if (img.length >= 0) {
                        Logger.info("1")
                        img.push(k)
                    }
                }

            })));
            params.image = img;
            Logger.info("", image)
        }
    }

    //Logger.info("",imagee)

    //if (param.mailSecuritySetting === "null" || param.mailSecuritySetting === "none") param.mailSecuritySetting = null
    if (!ab) {
        [err, data] = await to(About.create({ ...params }));
        if (err) TE(err.message);
        if (!data) TE("Error creating about");
        return data
        // return {/ title: data.title,sub_title:data.sub_title, image: data.image, content: data.content }
    }

    for (let key in params) {
        ab[key] = params[key]
    }
    // if (params.deleteImage) {
    //     const [er,deleteImage] = await to(Promise.all(params.deleteImage.map(async i=>{

    //     })));
    if (params.deleteImage && params.deleteImage.length > 0) {
        Logger.info(ab.image)
        let newArray=[] ;
        let array=ab.image;
        await Promise.all(params.deleteImage.map(async i => {
            
             newArray= lodash.remove(array, function(e) {
                return BASE_URL + "/" +e===i;
            });
        } 
        ));
        Logger.info(newArray)
        ab.image=array
    }
    [err] = await to(ab.save());
    if (err) TE(err.message);
    [err] = await to(ab.reload());
    if (err) TE(err.message)
    let img = []
    if (ab.image.length > 0) {
        img = await this.imageMap(ab.image);
    }
    return { title: ab.title,sub_title:ab.sub_title, image: img, content: ab.content }
}

module.exports.getAbout = async () => {
    let err, ab;
    [err, ab] = await to(About.findOne({}));
    if (err) TE(err.message);
    if (!ab) TE(STRINGS.NO_DATA);
    let img = []
    if (ab.image.length > 0) {
        img = await this.imageMap(ab.image);
    }

    return { title: ab.title,sub_title:ab.sub_title, image: img, content: ab.content }
}

exports.imageMap = async (img) => {
    const image = await Promise.all(img.map(i => {
        return BASE_URL + "/" + i;
    }))
    return image;
}