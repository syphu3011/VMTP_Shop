import {
  Button,
  Checkbox,
  Col,
  Divider,
  Layout,
  Row,
  Skeleton,
  Space,
  Tag,
} from "antd";
import "../../../style/product.css";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  addPrivileges,
  getFeatures,
  getPrivileges,
  removePrivileges,
} from "../../../../../controllers/modules/admin/privileges";
import { authenticationAdmin } from "../../../../../../utils/util";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 140,
  paddingInline: 10,
  lineHeight: "140px",
  backgroundColor: "#ffffff",
  maxHeight: "100%",
  height: "unset",
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
  id_permission: string;
  name_permission: string;
  detail_permission: detail[];
}
interface detail {
  ma: string;
  ten: string;
}
interface AddItem {
  name: string;
  id_permission: { ma: number }[];
}
const AddPermission: AddItem = {
  name: "",
  id_permission: [],
};
const plainOptions = [];
const defaultCheckedList = [];

// const optionsst: SelectProps["options"] = [];
// const handleChange = (value: string[]) => {
//   console.log(`selected ${value}`);
// };
// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   editing: boolean;
//   dataIndex: string;
//   title: any;
//   inputType: "number" | "text";
//   record: Item;
//   index: number;
//   children: React.ReactNode;
// }
const CheckboxGroup = Checkbox.Group;
// const EditableCell: React.FC<EditableCellProps> = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{ margin: 0 }}
//           rules={[
//             {
//               required: true,
//               message: `Hãy nhập ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };
const Status = () => {
  const feature: detail[] = [];
  const originData: Item[] = [];
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const handleDelete = (key: React.Key) => {
    removePrivileges(parseInt(key.toString())).then((rs) => {
      console.log(rs);
      alert(rs.data.xoaQuyen.message);
      if (rs.data.xoaQuyen.status === 200) {
        setReload(true);
      }
    });
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id_permission",
      width: "auto",
    },
    {
      title: "Tên quyền",
      dataIndex: "name_permission",
      width: "auto",
    },
    {
      title: "Chi tiết quyền",
      dataIndex: "detail_permission",
      width: "auto",
      render: (detail_permission: detail[]) => (
        <>
          {detail_permission.map((tag) => (
            <Tag key={tag.ma}>{tag.ten.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      dataIndex: "delete_permiss",
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
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list: CheckboxValueType[]) => {
    console.log(list);
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    console.log(e.target.checked ? plainOptions : []);
  };

  useEffect(() => {
    async function fetchMetaData(rs?) {
      plainOptions.splice(0, plainOptions.length);
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }

      const rsquyenData = await getPrivileges();
      const rschucnangData = await getFeatures();
      for (const element of rsquyenData.data.quyen.data) {
        originData.push({
          key: element.ma,
          id_permission: element.ma,
          name_permission: element.ten,
          detail_permission: element.chucnang,
        });
      }
      for (const e of rschucnangData.data.chucnang.data) {
        plainOptions.push(e.ten);
        feature.push({
          ma: e.ma,
          ten: e.ten,
        });
      }
      setData(originData);
      setIsReady(true);
    }

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  const layMaTuTen = (ten) => {
    const getid = feature.find((item) => item.ten == ten);
    return getid ? Number(getid.ma) : null;
  };
  const onclick = () => {
    console.log(checkedList);
    for (const e of checkedList) {
      let ma = layMaTuTen(e);
      if (ma !== null) {
        AddPermission.id_permission.push({ ma });
      }
    }
    console.log(" truoc khi them" + AddPermission);
    addPrivileges(AddPermission.name, AddPermission.id_permission).then(
      (rs) => {
        console.log(rs);
        alert(rs.data.taoQuyen.message);
        if (rs.data.taoQuyen.status === 201) {
          setReload(true);
        }
      }
    );
  };
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Tên:"
                labelAlign="left"
                labelCol={{ span: 6 }}
                style={{
                  width: "100%",
                  minHeight: "100%",
                }}
              >
                <Input
                  style={{ width: "80%" }}
                  onChange={(e) => (AddPermission.name = e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <Form.Item
                label="Quyền"
                labelAlign="left"
                labelCol={{ span: 3 }}
                style={{ minHeight: 30, minWidth: "100%" }}
              >
                <>
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                  >
                    Chọn hết
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                  />
                </>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 120,
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "60%", marginBottom: 10 }}
                  onClick={onclick}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "60%" }}>
                  Làm mới
                </Button>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={data}
              columns={columns}
              rowClassName="editable-permission"
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
export default Status;
