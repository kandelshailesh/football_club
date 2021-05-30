const SequelizeSlugify = require('sequelize-slugify');

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    'members',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      position_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
      },
      committee_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      paranoid: true,
      tableName: 'members',
    },
  );
  Model.associate = function (models) {
    this.belongsTo(models.committee, { foreignKey: 'committee_id', targetKey: 'id' });
    this.belongsTo(models.position, { foreignKey: 'position_id', targetKey: 'id' });
  };

  return Model;
};
