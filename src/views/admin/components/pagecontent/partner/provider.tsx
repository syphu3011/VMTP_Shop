import {
  Button,
  Col,
  DatePicker,
  Layout,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
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
  id_product_partner: string;
  name_product_partner: string;
  price_partner: number;
}

const originData: Item[] = [];
const options: SelectProps["options"] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_partner: `${i}`,
    name_partner: `Nguyễn Văn ${i}`,
    id_product_partner: `233321312321`,
    name_product_partner: "18/02/2002",
    price_partner: 4000000,
  });
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
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
const Provider = () => {
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
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
      title: "Mã sản phẩm",
      dataIndex: "id_product_partner",
      editable: true,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product_partner",
      editable: true,
    },
    {
      title: "Giá nhà cung cấp",
      dataIndex: "price_partner",
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
      dataIndex: "delete",
      width: "8%",
      render: () => <a>Xóa</a>,
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

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col
              className="gutter-row"
              span={7}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Form.Item
                label="Đối tác:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Select
                  allowClear
                  style={{ width: "90%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={11}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Form.Item
                  label="Sản phẩm cung cấp:"
                  labelAlign="left"
                  labelCol={{ span: 7 }}
                >
                  <Input style={{ width: "80%" }} />
                </Form.Item>
                <Form.Item
                  label="Giá cung cấp:"
                  labelAlign="left"
                  labelCol={{ span: 7 }}
                >
                  <Input style={{ width: "80%" }} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "50%", marginBottom: 30 }}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "50%" }}>
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
              rowClassName="editable-row-provider"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </Content>
      </Layout>
    </Space>
  );
};
export default Provider;
