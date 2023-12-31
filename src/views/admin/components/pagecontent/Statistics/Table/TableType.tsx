import { Table } from "antd";
interface ItemType {
  key: string;
  id_type_stat: string;
  name_type_stat: string;
  provider_type_stat: string;
  amount_sell_type: number;
  income_type: number;
  expenses_type: number;
  profits_type: number;
}
const originData: ItemType[] = [];
for (let i = 0; i < 7; i++) {
  originData.push({
    key: i.toString(),
    id_type_stat: `${i}`,
    name_type_stat: `Áo quần ${i}`,
    provider_type_stat: "000000",
    amount_sell_type: 12,
    income_type: 15000000,
    expenses_type: 3200000,
    profits_type: 15000000 - 3200000,
  });
}
const columns = [
  {
    title: "Mã loại",
    dataIndex: "id_type_stat",
    width: "auto",
  },
  {
    title: "Loại sản phẩm",
    dataIndex: "name_type_stat",
    width: "auto",
  },
  {
    title: "Nhà cung cấp",
    dataIndex: "provider_type_stat",
    width: "auto",
  },
  {
    title: "Số lượng bán",
    dataIndex: "amount_sell_type",
    width: "auto",
    sorter: (a, b) => a.amount_sell_type - b.amount_sell_type,
  },
  {
    title: "Thu",
    dataIndex: "income_type",
    width: "auto",
    sorter: (a, b) => a.income_type - b.income_type,
  },
  {
    title: "Chi",
    dataIndex: "expenses_type",
    width: "auto",
    sorter: (a, b) => a.expenses_type - b.expenses_type,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_type",
    width: "auto",
    sorter: (a, b) => a.profits_type - b.profits_type,
  },
];
const TableType = () => {
  return (
    <Table
      bordered
      dataSource={originData}
      columns={columns}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_amount_sell_type = 0;
        let total_income_type = 0;
        let total_expenses_type = 0;
        pageData.forEach(
          ({ profits_type, amount_sell_type, income_type, expenses_type }) => {
            total_profits += profits_type;
            total_amount_sell_type += amount_sell_type;
            total_income_type += income_type;
            total_expenses_type += expenses_type;
          }
        );
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_amount_sell_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {total_income_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}>
                {total_expenses_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>{total_profits}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableType;
