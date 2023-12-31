const { Op, literal } = require("sequelize")
const {DonVi, sequelize} = require("../../database/models")
const {STATUS_CODE, CHUCNANG} = require("../const")
const { checkAndResolveAdmin } = require("./checkToken")
module.exports = {
    Mutation: {
      async taoDonVi(root, args, context) {
        const {ten} = args.input
        async function callback(e) {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const donvi = await DonVi.create({ ten})
            await transaction.commit()
            return {
              status: STATUS_CODE.create_success,
              message: "Thêm đơn vị thành công!",
            }
          } 
          catch(e) {
            await transaction.rollback()
            return {
              status: STATUS_CODE.create_fail,
              message: "Bị lỗi! Thêm đơn vị không thành công!",
            }
          }
        }
        return checkAndResolveAdmin(context.taikhoan, callback, 'đã thêm đơn vị có tên: '+ten+'!',CHUCNANG.SUASANPHAM);
      },
      async suaDonVi(root, args, context) {
        async function callback(e) {
          let transaction
          const {ma, ten} = args.input
          try {
            transaction = await sequelize.transaction()
            const donvi = await DonVi.findByPk(ma)
            await donvi.update({ten})
            await donvi.save()
            await transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Sửa đơn vị thành công!",
            }
          } 
          catch(e) {
            await transaction.rollback()
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Sửa đơn vị không thành công!",
            }
          }
        }
        return checkAndResolveAdmin(context.taikhoan, callback, 'đã sửa đơn vị có mã: '+ma+' thành '+ten+'!',CHUCNANG.SUASANPHAM);
      },
      async xoaDonVi(root, args, context) {
        async function callback(e) {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const {ma, ten} = args.input
            const donvi = await DonVi.findByPk(ma)
            await donvi.destroy()
            await donvi.save()
            await transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Xóa đơn vị thành công!",
            }
          } 
          catch(e) {
            await transaction.rollback()
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Xóa đơn vị không thành công!",
            }
          }
        }
        return checkAndResolveAdmin(context.taikhoan, callback, 'đã xóa đơn vị có mã: '+ma+'!',CHUCNANG.SUASANPHAM);
      }
    },
    Query: {
      donvi: async (root, args, context) => {
        try {
          const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
            try {
              context.dont_need_encrypt = true
              const rs = {
                status: STATUS_CODE.query_success,
                message: "Lấy danh sách đơn vị thành công!",
                data: await DonVi.findAll()
              }
              return rs
            }
            catch (e) {
              return {
                status: STATUS_CODE.query_fail,
                message: "Lấy danh sách đơn vị không thành công!",
                data: null
              }
            }
          })
          return rs
      }
      catch (e) {
          return {
              status: STATUS_CODE.query_fail,
              message: "Lấy danh sách loại không thành công!",
              data: []
          }
      }
      },
      donvivoithuoctinh: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách đơn vị thành công!",
            data: await DonVi.findAll({
              where: {
                ten: {[Op.like]: '%' + ten + '%'},
                ma: {[Op.like]: '%' + ma + '%'}
              }
            })
          }
          return rs
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách đơn vị không thành công!",
            data: null
          }
        }
      },
      timkiemdonvi: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách đơn vị thành công!",
            data: await DonVi.findAll({
              where: {
                [Op.or]: {
                  ten: {[Op.like]: '%' + ten + '%'},
                  ma: {[Op.like]: '%' + ma + '%'}
                }
              }
            })
          }
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách đơn vị không thành công!",
            data: null
          }
        }
      }
    }
}