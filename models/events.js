const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequlize, DataTypes) => {
  let Model = sequlize.define(
    "events",
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
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["active", "hold"],
        default: "active",
      },
      slug: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
        get: function () {
          const dataValue = this.getDataValue("image");
          console.log("getter billingAddress", dataValue);
          if (dataValue) return JSON.parse(dataValue);
        },
        set: function (value) {
          console.log("setter billingAddress", value);
          if (value) this.setDataValue("image", JSON.stringify(value));
        },
      },
    },
    {
      paranoid: true,
      tableName: "events",
    }
  );

  // SequelizeSlugify.slugifyModel(Model, {
  //   source: ['title'],
  // });
  // Model.associate = function (models) {
  //   this.hasMany(models.products, {
  //     foreignKey: 'id',
  //     targetKey: 'category_id',
  //   });
  // };
  return Model;
};
