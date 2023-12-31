const SanPhamResolvers = require('./sanpham')
const LoaiResolvers = require('./loai')
const NhaCungCapResolvers = require('./nhacungcap')
const PhieuNhapResolvers = require('./phieunhap') 
const DonViResolvers = require('./donvi') 
const TrangThaiNhaCungCapResolvers = require('./trangthainhacungcap')
const ChucNangResolvers = require('./chucnang')
const QuyenResolvers = require('./quyen')
const TaiKhoanResolvers = require('./taikhoan')
const MatHangResolvers = require('./mathang')
const KhachHangResolvers = require('./khachhang')
const LichSuHeThongResolvers = require('./lichsuhethong');
const HangTrongKhoResolvers = require('./hangtrongkho');
const ChiTietPhieuNhapResolvers = require('./chitietphieunhap');
const NhanVienResolvers = require('./nhanvien');
const HoaDonResolvers = require('./hoadon');
const ChiTietHoaDonResolvers = require('./chitiethoadon');
const ThongKeResolvers = require('./thongke');
const MauResolvers = require('./mau');
const KichCoResolvers = require('./kichco');
module.exports = [SanPhamResolvers, 
    LoaiResolvers, 
    NhaCungCapResolvers, 
    TrangThaiNhaCungCapResolvers, 
    PhieuNhapResolvers, 
    MatHangResolvers, 
    DonViResolvers, 
    ChucNangResolvers, 
    TaiKhoanResolvers, 
    QuyenResolvers
    , KhachHangResolvers, 
    LichSuHeThongResolvers, 
    HangTrongKhoResolvers, 
    ChiTietPhieuNhapResolvers, 
    NhanVienResolvers, 
    HoaDonResolvers, 
    ChiTietHoaDonResolvers, 
    ThongKeResolvers, 
    MauResolvers,
    KichCoResolvers]