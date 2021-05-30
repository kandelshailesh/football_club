//import system_modules from "../../auth_models/system_modules";
import { createPosition, deletePosition, getPosition, updatePosition } from '../services/position';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createPositionController = async (req, res) => {
  const param = req.body;

  try {
    const [err, newPackage] = await too(createPosition(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW Position ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getPositionController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getPosition(param));

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

export const updatePositionController = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const [err, updatedPackage] = await too(updatePosition(body, id));
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

export const deletePositionController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deletePosition(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `Position DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
