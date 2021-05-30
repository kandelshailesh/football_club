import {
  createContact,
  deleteContact,
  getContact,
  updateContact,
} from '../services/contact';

const { too, ReS, ReE, TE } = require('../services/util');
const { status_codes_msg } = require('../utils/appStatics');

export const createContactController = async (req, res) => {
  const param = req.body;

  try {
    const [err, newPackage] = await too(createContact(param));
    if (err) {
      ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (newPackage) {
      ReS(
        res,
        {
          message: 'NEW Contact ADDED',
          DATA: newPackage,
        },
        status_codes_msg.CREATED.code,
      );
    }
  } catch (error) {
    ReE(res, error.message, status_codes_msg.FAILED.code);
  }
};

export const getContactController = async (req, res) => {
  const param = req.query;
  try {
    const [err, packageByKey] = await too(getContact(param));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (packageByKey) {
      return ReS(
        res,
        {
          message: `FETCH SUCCESSFULLY`,
          DATA: packageByKey,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};

export const updateContactController = async (req, res) => {
  const body = req.body;
  console.log("req.query0",req.query,req.params)
  const { id } = req.params;
  try {
    const [err, updatedPackage] = await too(updateContact(body, id));
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

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const [err, deletedPackage] = await too(deleteContact(id));

    if (err) {
      return ReE(res, err, status_codes_msg.FAILED.code);
    }
    if (deletedPackage) {
      return ReS(
        res,
        {
          message: `Contact DELETED`,
          DATA: deletedPackage,
        },
        status_codes_msg.SUCCESS.code,
      );
    }
  } catch (error) {
    return ReE(res, error, status_codes_msg.FAILED.code);
  }
};
