"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Quyen extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Quyen.belongsToMany(models.ChucNang, {
                as: "ChucNang",
                through: "ChiTietQuyen",
                foreignKey: "maquyen",
            });
        }
    }
    Quyen.init(
        {
            ma: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ten: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Quyen",
            tableName: "Quyen",
            timestamps: false,
        }
    );
    return Quyen;
};
