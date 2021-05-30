// export {}
const { ExtractJwt, Strategy } = require('passport-jwt');
const { users} = require('../models');
const {too} = require('../services/util');
const Logger = require("../logger");
 

module.exports = function(passport){
    let opts={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_ENCRYPTION;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await too(users.findOne({where:{id:jwt_payload.id}}));
        Logger.info("666666666666",user);
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}