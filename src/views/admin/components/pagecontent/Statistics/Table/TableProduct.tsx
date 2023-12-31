import { Table } from "antd";
import { useState } from "react";
import { formatCurrency } from "../../../../../../../utils/util";

interface ItemPro {
  key: string;
  rank_pro: number;
  id_pro_stat: number;
  name_pro_stat: string;
  amount_sell_pro: string;
  income_pro: string;
  expenses_pro: string;
  profits_pro: string;
}
// const ProData: ItemPro[] = [];
// for (let i = 0; i < 7; i++) {
//   ProData.push({
//     key: i.toString(),
//     rank_pro: i,
//     id_pro_stat: `${i}`,
//     name_pro_stat: `Áo thun ${i}`,
//     provider_pro_stat: "000000",
//     amount_sell_pro: 12,
//     income_pro: 15000000,
//     expenses_pro: 3200000,
//     profits_pro: 15000000 - 3200000,
//   });
// }
// ProData.push({
//   key: "7",
//   rank_pro: 7,
//   id_pro_stat: `7`,
//   name_pro_stat: `Áo thun 7`,
//   provider_pro_stat: "000000",
//   amount_sell_pro: 13,
//   income_pro: 17000000,
//   expenses_pro: 3500000,
//   profits_pro: 17000000 - 3500000,
// });
const columnsPro = [
  {
    title: "Hạng",
    dataIndex: "rank_pro",
    width: "auto",
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id_pro_stat",
    width: "auto",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name_pro_stat",
    width: "auto",
  },
  {
    title: "Số lượng bán",
    dataIndex: "amount_sell_pro",
    width: "auto",
    // sorter: (a, b) => a.amount_sell_pro - b.amount_sell_pro,
  },
  {
    title: "Thu",
    dataIndex: "income_pro",
    width: "auto",
    // sorter: (a, b) => a.income_pro - b.income_pro,
  },
  {
    title: "Chi",
    dataIndex: "expenses_pro",
    width: "auto",
    // sorter: (a, b) => a.expenses_pro - b.expenses_pro,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_pro",
    width: "auto",
    // sorter: (a, b) => a.profits_pro - b.profits_pro,
  },
];

const TableProduct = ({ data }) => {
  return (
    <Table
      bordered
      dataSource={data}
      columns={columnsPro}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_amount_sell_pro = 0;
        let total_income_pro = 0;
        let total_expenses_pro = 0;
        pageData.forEach(
          ({ profits_pro, amount_sell_pro, income_pro, expenses_pro }) => {
            total_profits += parseInt(profits_pro.replace(/[^\d]/g, ""));
            total_amount_sell_pro += parseInt(
              amount_sell_pro.replace(/[^\d]/g, "")
            );
            total_income_pro += parseInt(income_pro.replace(/[^\d]/g, ""));

            total_expenses_pro += parseInt(expenses_pro.replace(/[^\d]/g, ""));
          }
        );
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {" "}
                {total_amount_sell_pro.toLocaleString("vi-VN")}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {formatCurrency(total_income_pro + "")}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}>
                {formatCurrency(total_expenses_pro + "")}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>
                {formatCurrency(total_profits)}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableProduct;
