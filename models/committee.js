const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'committee',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_year: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_year: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['active', 'hold'],
        default: 'active',
      },
      
    },
    {
      paranoid: true,
      tableName: 'committee',
    },
  );

  
  return Model;
};
