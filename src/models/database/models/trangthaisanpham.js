'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrangThaiSanPham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TrangThaiSanPham.hasMany(models.HangTrongKho, {as: 'HangTrongKho', foreignKey: 'matrangthai'})
      TrangThaiSanPham.hasMany(models.SanPham, {as: 'SanPham', foreignKey: 'matrangthai'})
    }
  }
  TrangThaiSanPham.init({
    ma: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TrangThaiSanPham',
    tableName: 'TrangThaiSanPham',
    timestamps: false
  });
  return TrangThaiSanPham;
};