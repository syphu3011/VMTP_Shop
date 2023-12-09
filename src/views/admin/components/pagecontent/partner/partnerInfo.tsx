import { Button, Col, DatePicker, Layout, Row, Skeleton, Space } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { authenticationAdmin } from "../../../../../../utils/util";
import { useNavigate } from "react-router-dom";
import {
  addProvider,
  editProvider,
  getProvider,
  removeProvider,
} from "../../../../../controllers/modules/admin/provider";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 120,
  paddingInline: 10,
  lineHeight: "180px",
  backgroundColor: "#ffffff",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};

interface Item {
  key: string;
  id_partner: string;
  name_partner: string;
  number_partner: number;
  address_partner: string;
  status_partner: string;
}
interface AddItem {
  name: String;
  addres: String;
  phonenumber: String;
  id_provider_status: number;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "Date";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Hãy nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Addpartner: AddItem = {
  name: "",
  addres: "",
  phonenumber: "",
  id_provider_status: 1,
};
const partner = () => {
  const originData: Item[] = [];
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", numberphone: "", birthday: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const dateFormat = "DD/MM/YYYY";

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
        console.log(
          parseInt(newData[index].id_partner),
          newData[index].name_partner.toString(),
          newData[index].address_partner.toString(),
          newData[index].number_partner.toString(),
          1
        );
        editProvider(
          parseInt(newData[index].id_partner),
          newData[index].name_partner.toString(),
          newData[index].address_partner.toString(),
          newData[index].number_partner.toString(),
          1
        ).then((rs) => {
          //TODO: Thêm thông báo ở đây
          console.log(rs);
          alert(rs.data.suaNhaCungCap.message);
          if (rs.data.suaNhaCungCap.status === 201) {
            setReload(true);
          }
        });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (key: React.Key) => {
    removeProvider(parseInt(key.toString())).then((rs) => {
      console.log(rs);
      alert(rs.data.xoaNhaCungCap.message);
      if (rs.data.xoaNhaCungCap.status === 200) {
        setReload(true);
      }
    });
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    // const newData = data.filter((item) => item.key !== key);
    // setData(newData);
  };
  const columns = [
    {
      title: "Mã",
      dataIndex: "id_partner",
      width: "10%",
    },
    {
      title: "Tên đối tác",
      dataIndex: "name_partner",
      width: "15%",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "number_partner",
      editable: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address_partner",
      editable: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status_partner",
    },
    {
      dataIndex: "edit_partner",
      width: "8%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy??" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
          </Typography.Link>
        );
      },
    },
    {
      key: "operation",
      dataIndex: "dlt_part_infor",
      width: "8%",
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Bạn thật sự muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "numberphone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    async function fetchPartnerData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getProvider();

      var fetchData = rsFetchData.data.nhacungcap.data;
      fetchData.forEach((element, index) => {
        originData.push({
          key: element.ma,
          id_partner: element.ma,
          name_partner: element.ten,
          number_partner: element.dienthoai,
          address_partner: element.diachi,
          status_partner: element.trangthai.ten,
        });
      });

      setIsReady(true);
    }
    // console.log(data)

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchPartnerData) : fetchPartnerData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  const onclick = () => {
    console.log(Addpartner);
    addProvider(
      Addpartner.name,
      Addpartner.addres,
      Addpartner.phonenumber,
      Addpartner.id_provider_status
    ).then((rs) => {
      console.log(rs);
      alert(rs.data.taoNhaCungCap.message);
      if (rs.data.taoNhaCungCap.status === 201) {
        setReload(true);
      }
    });
  };
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={10}>
              <Form.Item
                label="Tên nhà cung cấp:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Input
                  style={{ width: "60%" }}
                  onChange={(e) => (Addpartner.name = e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <div>
                <Form.Item
                  label="Số điện thoại:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (Addpartner.phonenumber = e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (Addpartner.addres = e.target.value)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "70%", marginBottom: 30 }}
                  onClick={onclick}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "70%" }}>
                  Làm mới
                </Button>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </Content>
      </Layout>
    </Space>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
    </div>
  );
};
export default partner;
