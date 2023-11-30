const STATUS_CODE = {
    query_success: "200",
    create_success: "201",
    update_success: "201",
    delete_success: "201",
    query_fail: "404",
    create_fail: "400",
    update_fail: "409",
    delete_fail: "409"
}
const PRIVATE_CODE_AT = "3jfpskefx"
const PRIVATE_CODE_RT = "dkfxsse3r"
const LIFE_AT = 10
const LIFE_RT = 3600 * 72
const CHUCNANG = Object.freeze({
    THEMSANPHAM: "themSanPham",
    XOASANPHAM: "xoaSanPham",
    SUASANPHAM: "suaSanPham",
    THEMLOAI: "themLoai",
    SUALOAI: "suaLoai",
    XOALOAI: "xoaLoai",
    SUAKHACHHANG: "suaKhachHang",
    XOAKHACHHANG: "xoaKhachHang",
    XEMKHO: "xemKho",
    SUAKHO: "suaKho",
    NHAPHANG: "nhapHang"
}
)
const MAIL = Object.freeze({
    USERNAME: "vmtpshop@gmail.com",
    PASSWORD: "mgca fhab qtst weev"
})
module.exports = {STATUS_CODE,PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT, CHUCNANG, MAIL}