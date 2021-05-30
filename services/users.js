const { users } = require('../models');
const { to, TE, paginate, getSearchQuery, getOrderQuery } = require('../utils');
const Logger = require('../logger');
const { STRINGS, status_codes_msg } = require('../utils/statusCode');
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const parseStrings = require('parse-strings-in-object');
const omit = require('lodash/omit');

exports.getAllUsers = async params => {
  const parsedParams = parseStrings(params);
  const { page = 1, limit, search = {}, sort = {} } = parsedParams;
  Logger.info(parsedParams);
  const query = omit(parsedParams, ['page', 'limit', 'search', 'sort']);
  Logger.info(query);
  const dbQuery = {
    where: {
      ...query, //filter by this query
      // userTypeId:2,
      ...getSearchQuery(search),
    },
    // include: [
    //     { model: order_masters, as:'orders' }

    // ],
    attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
    ...getOrderQuery(sort),
    ...paginate(page, limit),
  };

  // console.log(pick(dbQuery, 'where'))
  const [err, data] = await to(users.findAndCountAll(dbQuery));
  if (err) TE(STRINGS.DB_ERROR + err.message);
  if (!data) TE(STRINGS.NO_DATA);
  return { users: data.rows, count: data.count };
};

exports.createUser = async params => {
  //Logger.info(params)
  let { firstName, lastName, email, phone, password, status } = params;

  let err, data;
  [err, data] = await to(users.findOne({ where: { phone } }));
  if (err) TE(err.message);
  Logger.info(data);
  if (data) TE('Phone number ' + STRINGS.ALREADY_EXIST);
  [err, data] = await to(users.findOne({ where: { email } }));
  if (err) TE(err.message);
  Logger.info(data);
  if (data) TE('Email  ' + STRINGS.ALREADY_EXIST);
  Logger.info(params);
  [err, data] = await to(users.create(params));
  if (err) TE(+err.message);
  //if (!data) TE(STRINGS.DB_ERROR);
  return data;
};

exports.getUserById = async id => {
  Logger.info(id);

  const [err, data] = await to(
    users.findOne({
      where: {
        id,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
      // include: [
      //   { model: system_users, attributes: ['id', 'name'] },
      //   { model: enduser_group, attributes: ['id', 'name'] },
      // ],
    }),
  );
  if (err) TE(STRINGS.DB_ERROR + err.message);
  if (!data) TE(STRINGS.NO_DATA);
  return data;
};

exports.editUser = async (params, id, query) => {
  Logger.info(id);

  let err, data;
  [err, data] = await to(
    users.findOne({
      where: {
        id,
      },
    }),
  );
  if (err) TE(STRINGS.DB_ERROR + err.message);
  if (!data) TE(STRINGS.NO_DATA);

  if (query) {
    if (query.status) {
      data.status = query.status;
      return await data.save();
    }
  }

  if (params.password) {
    const pas = await this.passwordEncrypt(params.password);
    params.password = pas;
    params.passwordChangedAt = Date.now();
  }

  [err, data] = await to(users.update(params, { where: { id } }));
  if (err) TE(+err.message);
  if (data[0] !== 1) TE(STRINGS.DB_ERROR);

  [err, data] = await to(
    users.findOne({
      where: {
        id,
      },
      attributes: ['firstName', 'lastName', 'email', 'phone'],
      // include: [
      //   { model: system_users, attributes: ['id', 'name'] },
      //   { model: enduser_group, attributes: ['id', 'name'] },
      // ],
    }),
  );
  if (err) TE(STRINGS.DB_ERROR + err.message);
  if (!data) TE(STRINGS.NO_DATA);

  return data;
};

exports.passwordEncrypt = async password => {
  let salt, hash, err;
  [err, salt] = await to(bcrypt.genSalt(10));
  if (err) TE(err.message, true);
  console.log(salt);
  [err, hash] = await to(bcrypt.hash(password, salt));
  if (err) TE(err.message, true);
  return hash;
};
export const updatePassword = async param => {};

export const createGuestUser = async param => {
  try {
    let [err, user] = await too(users.create({ isGuest: true }));
    if (err) TE(err.message);
    if (!user) TE('User not registered');
    if (err) TE(err.message);
    return ReS(
      res,
      { message: 'Guest user created successfully', data: data.toWeb() },
      status_codes_msg.CREATED.code,
    );
  } catch (error) {
    TE(error.message);
  }
};
