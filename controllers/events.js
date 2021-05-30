//import system_modules from "../../auth_models/system_modules";
import {
  createEvents,
  deleteEvents,
  getEvents,
} from '../services/events';

const { too, ReS,to, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');
const Logger = require('../logger');

export const createEventsController = async (req, res) => {
  const param = req.body;
  let message="Events Added SuccessFully!"
  if(req.files){
    param.image = (req.files["image"])? req.files["image"]:null;
}

if(!param.slug && param?.slug==undefined){
  param.slug=param?.title
}
if (!param.status) {
  param.status = 'active';
}

if(param?.id)
{
message="Events Updated SuccessFully!"
}
  console.log("params",param,"hii");
  try {
    const [err, newPackage] = await too(createEvents(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: message,
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getEventsController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getEvents(param));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (packageByKey) {
      return ReS(
        res,
        {
          message: `FETCH SUCCESSFULLY`,
          DATA: packageByKey.rows,

          count: packageByKey.count,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
 

export const deleteEventsController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deleteEvents(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `Events Deleted Successfully!`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
