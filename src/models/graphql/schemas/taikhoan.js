const {gql} = require('apollo-server-express')

module.exports = gql`
type TaiKhoan {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int!
  quyen: Quyen!
}
input TaiKhoanInput {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int
}
input TaiKhoanTokenInput {
  tentaikhoan: String
  token: String!
  rToken: String!
  maquyen: Int
}
type TaiKhoanQueryResponse {
  status: Int!
  message: String!
  data: [TaiKhoan!]!
}
type TaiKhoanResponse {
  status: Int!
  message: String!
}
type Token {
  maquyen: Int!
  accessToken: String!
  refreshToken: String!
}
type DangNhapResponse {
  status: Int!
  message: String!
  data: Token
}
extend type Query {
  taikhoan: TaiKhoanQueryResponse
  taikhoanvoithuoctinh(input: TaiKhoanInput): TaiKhoanQueryResponse
  timkiemtaikhoan(input: TaiKhoanInput): TaiKhoanQueryResponse
}
extend type Mutation {
  taoTaiKhoan(input: TaiKhoanInput): TaiKhoanResponse
  dangNhap(input: TaiKhoanInput):DangNhapResponse
  dangNhapVoiToken(input: TaiKhoanTokenInput):DangNhapResponse
  dangNhapAdminVoiToken(input: TaiKhoanTokenInput):DangNhapResponse
  suaTaiKhoan(input: TaiKhoanInput): TaiKhoanResponse
  xoaTaiKhoan(ma: Int!): TaiKhoanResponse
}
`