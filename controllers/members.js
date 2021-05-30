//import system_modules from "../../auth_models/system_modules";
import {
  createMember,
  deleteMember,
  getMember,
  updateMember,
} from '../services/members';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createMemberController = async (req, res) => {
  const param = req.body;
  console.log("params",param,req.files)
  if (req.files) {
    param.image = req.files['image'] ? req.files['image'][0].path : null;
  }
 
  // console.log("params2",param?.order_item,param.image)
  try {
    const [err, newPackage] = await too(createMember(param));
    console.log("DARA Return",err,newPackage)
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW ORDER ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getMemberController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getMember(param));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (packageByKey) {
      return ReS(
        res,
        {
          message: `FETCH SUCCESSFULLY`,
          DATA: packageByKey?.rows,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const updateMemberController = async (req, res) => {
  const body = req.body;
  const { id } = req.query;
  if (req.files) {
    body.image = req.files['image'] ? req.files['image'][0].path : null;
  }
  try {
    const [err, updatedPackage] = await too(updateMember(body, id));
    console.log(updatedPackage);

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (updatedPackage) {
      return ReS(
        res,
        {
          message: `DATA UPDATED`,
          DATA: updatedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const deleteMemberController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deleteMember(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `ORDER DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
