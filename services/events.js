const { events, products } = require("../models");
const { too, ReS, ReE, TE, to, paginate } = require("./util");
const Logger = require("../logger");
const lodash = require('lodash')

const omit = require("lodash/omit");

export const createEvents = async (param) => {
  try {
    let ab = null;
    let params = param;
    console.log("parmss11", params);
    const [err, data] = await too(
      events.findOne({ where: { title: params["title"] } })
    );

    if (err) return TE(err.message);
    if (data) return TE("Title already exists");
    Logger.info("params", params.image);

    if (params?.image) {
      console.log("line 23");
      if (params.image?.length > 0) {
        let img = [];
        // Logger.info("Sheenam",ab)
        img = ab == null ? [] : ab?.image;
        // Logger.info("img", img);
        await to(
          Promise.all(
            params.image.map(async (i) => {
              let k = i.path ? i.path : null;
              // Logger.info("2")
              if (k !== null) {
                Logger.info("1", k, img.length);
                if (img.length >= 0) {
                  // Logger.info("1")
                  img.push(k);
                }
              }
            })
          )
        );
        params.image = img;
        // Logger.info("image", params.image)
      }
    }

    Logger.info("Sb", params, params.image, ab);

    if (ab == null) {
      Logger.info("inside null ab", params, ab);

      if (params?.id) {
        console.log("id updwste", params.id);
        ab = {};
        for (let key in params) {
          ab[key] = params[key];
        }
        console.log("A0b83hii", ab);
        // params.deleteImage=JSON.parse(params.deleteImage)
        if (params?.deleteImage && params?.deleteImage?.length > 0) {
          console.log("in deleteImage",params.deleteImage)
          Logger.info(ab.image);
          let newArray = [];
          let array = ab.image;
          await Promise.all(
            params.deleteImage.map(async (i) => {
              newArray = lodash.remove(array, function (e) {
                return  "/" +e === i;
              });
            })
          );
          Logger.info("92", newArray);
          ab.image = array;
        }
        const [err, data] = await too(
          events.update(params, { where: { id: params.id } })
        );
        if (err) TE(err.message);
        if (!data) TE("SOMETHING WENT WRONG WHILE UPDATING");
        const [err1, data1] = await too(
          events.findOne({ where: { id: params.id } })
        );
        if (err1) TE(err1.message);
        if (!data1) TE("SOMETHING WENT WRONG WHILE FETCHING");
        // let img = [];
        // if (ab.image?.length > 0) {
        //   img = await this.imageMap(ab.image);
        // }
        // console.log("inside", ab, img);
        return data1
      } else {
        const [err1, data1] = await to(events.create({ ...params }));
        console.log("hiii 0", data1, err1);
        if (err1) TE(err1.message);
        if (!data1) TE("Error creating Events");
        return data1;
      }
    }

    console.log("A0b83hii", ab);
   
  } catch (error) {
    TE(error.message);
  }
};

export const getEvents = async (param) => {
  let page, limit;
  page = parseInt(param["page"]);
  limit = parseInt(param["limit"]);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ["page", "limit"]);
  try {
    const [err, allModules] = await too(
      events.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : "",
        ...paginate(page, limit),
        // include: param['product'] === 'true' ? [{ model: products }] : [],
      })
    );
    if (err) TE(err.message);
    if (!allModules) TE("SOMETHING WENT WRONG WHILE FETCHING");
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

 

export const deleteEvents = async (id) => {
  try {
    const [err, data] = await too(events.destroy({ where: { id: id } }));
    if (err) TE(err.message);
    if (!data) TE("SOMETHING WENT WRONG WHILE DELETING");
    return data;
  } catch (error) {
    TE(error.message);
  }
};

exports.imageMap = async (img) => {
  const image = await Promise.all(
    img.map((i) => {
      return  "/" + i;
    })
  );
  return image;
};
 
export const saveMultipleImages = async () => {};
