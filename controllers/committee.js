//import system_modules from "../../auth_models/system_modules";
import {
    createCommittee,
    deleteCommittee,
    getCommittee,
    updateCommittee,
  } from '../services/committee';
  
  const { too, ReS, ReE, TE } = require('../services/util');
  const { status_codes_msg } = require('../utils/appStatics');
  const Logger = require('../logger');
  
  export const createCommitteeController = async (req, res) => {
    const param = req.body;
  
    try {
      const [err, newSubscription] = await too(createCommittee(param));
      if (err) {
        ReE(res, err, status_codes_msg.FAILED.code);
      }
      if (newSubscription) {
        ReS(
          res,
          {
            message: 'NEW SUBSCRIBED ITEM ADDED',
            DATA: newSubscription,
          },
          status_codes_msg.CREATED.code,
        );
      }
    } catch (error) {
      ReE(res, error.message, status_codes_msg.FAILED.code);
    }
  };
  
  export const getCommitteeController = async (req, res) => {
    const param = req.query;
    try {
      const [err, SubscriptionByKey] = await too(getCommittee(param));
  
      if (err) {
        return ReE(res, err, status_codes_msg.FAILED.code);
      }
      if (SubscriptionByKey) {
        return ReS(
          res,
          {
            message: `FETCH SUCCESSFULLY`,
            DATA: SubscriptionByKey.rows,
            count: SubscriptionByKey.count,
          },
          status_codes_msg.SUCCESS.code,
        );
      }
    } catch (error) {
      return ReE(res, error, status_codes_msg.FAILED.code);
    }
  };
  
  export const updateCommitteeController = async (req, res) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const [err, updatedSubscription] = await too(updateCommittee(body, id));
      console.log(updatedSubscription);
  
      if (err) {
        return ReE(res, err, status_codes_msg.FAILED.code);
      }
      if (updatedSubscription) {
        return ReS(
          res,
          {
            message: `DATA UPDATED`,
            DATA: updatedSubscription,
          },
          status_codes_msg.SUCCESS.code,
        );
      }
    } catch (error) {
      return ReE(res, error, status_codes_msg.FAILED.code);
    }
  };
  
  export const deleteCommitteeController = async (req, res) => {
      console.log("Subscribe ID",req.params)
    const { id } = req.params;
    try {
      const [err, deletedSubscription] = await too(deleteCommittee(id));
  
      if (err) {
        return ReE(res, err, status_codes_msg.FAILED.code);
      }
      if (deletedSubscription) {
        return ReS(
          res,
          {
            message: `SUBSCRIBTION DELETED`,
            DATA: deletedSubscription,
          },
          status_codes_msg.SUCCESS.code,
        );
      }
    } catch (error) {
      return ReE(res, error, status_codes_msg.FAILED.code);
    }
  };
  