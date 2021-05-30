//import system_modules from "../../auth_models/system_modules";
import {
  createPlayers,
  deletePlayers,
  getPlayers,
  updatePlayers,
} from '../services/players';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createPlayersController = async (req, res) => {
  const param = req.body;
  console.log("param",param,req.files)
  if (req.files) {
    param.image = req.files['image'] ? req.files['image'][0].path : null;
  }
  if (!param.status) {
    param.status = 'active';
  }

  try {
    const [err, newPackage] = await too(createPlayers(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW Players ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getPlayersController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getPlayers(param));

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

export const updatePlayersController = async (req, res) => {
  const params = req.body;
  const { id } = req.params;

  if (req.files) {
    params.image = req.files['image'] ? req.files['image'][0].path : null;
  }

  try {
    const [err, updatedPackage] = await too(updatePlayers(params, id));
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

export const deletePlayersController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deletePlayers(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `Players DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
