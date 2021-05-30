const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'position',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
  
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'hold'],
        default: 'active',
      },
    },
    {
      paranoid: true,
      tableName: 'position',
    },
  );
  return Model;
};
