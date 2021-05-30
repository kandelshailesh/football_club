const { members, committee, position } = require("../models");
const { too, ReS, ReE, TE, paginate } = require("./util");

const omit = require("lodash/omit");

export const createMember = async (param) => {
  try {
    const [err, data] = await too(members.create(param));
    if (err) TE(err.message);
    if (data) return data;
  } catch (error) {
    TE(error.message);
  }
};

export const getMember = async (param) => {
  let page, limit;
  page = parseInt(param["page"]);
  limit = parseInt(param["limit"]);
  if (!page) page = 1;
  if (!limit) limit = 20;
  const query = omit(param, ["page", "limit"]);
  try {
    const [err, allModules] = await too(
      members.findAndCountAll({
        where: Object.keys(query).length > 0 ? query : "",
        ...paginate(page, limit),
        include: [
          { model: committee },
          { model: position },
        ],
      })
    );
    if (err) TE(err.message);
    if (!allModules) TE("SOMETHING WENT WRONG WHILE FETCHING");
    return allModules;
  } catch (error) {
    TE(error.message);
  }
};

export const updateMember = async (param, id) => {
  try {
    const [err, data] = await too(
      members.update(param, { where: { id: id } })
    );
    if (err) TE(err.message);
    if (!data) TE("SOMETHING WENT WRONG WHILE UPDATING");
    const [err1, data1] = await too(members.findOne({ where: { id: id } }));
    if (err1) TE(err1.message);
    if (!data1) TE('SOMETHING WENT WRONG WHILE FETCHING');
    return data1;
  } catch (error) {
    TE(error.message);
  }
};

export const deleteMember = async (id) => {
  try {
    const [err, data] = await too(
      members.destroy({ where: { id: id } })
    );
    if (err) TE(err.message);
    if (!data) TE("SOMETHING WENT WRONG WHILE DELETING");
    return data;
  } catch (error) {
    TE(error.message);
  }
};
