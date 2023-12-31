import { Table, TableProps } from "antd";
import { useState } from "react";
import { formatCurrency } from "../../../../../../../utils/util";

interface ItemCus {
  key: string;
  rank_cus: number;
  id_cus_stat: string;
  name_cus_stat: string;
  amount_order_cus: string;
  profits_cus: string;
}
const CusData: ItemCus[] = [];
for (let i = 0; i < 7; i++) {
  CusData.push({
    key: i.toString(),
    rank_cus: i,
    id_cus_stat: `${i}`,
    name_cus_stat: `Minh ${i}`,
    amount_order_cus: 1 + i + "",
    profits_cus: '1500000',
  });
}
const columnsCus = [
  {
    title: "Hạng",
    dataIndex: "rank_cus",
    width: "auto",
  },
  {
    title: "Mã khách hàng",
    dataIndex: "id_cus_stat",
    width: "auto",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name_cus_stat",
    width: "auto",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_cus",
    width: "auto",
    // sorter: (a, b) => a.amount_order_cus - b.amount_order_cus,
  },
  {
    title: "Tổng tiền",
    dataIndex: "profits_cus",
    width: "auto",
    // sorter: (a, b) => a.profits_cus - b.profits_cus,
  },
];
const onChange: TableProps<ItemCus>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableCustomer = ({data}) => {
  return (
    <Table
      bordered
      dataSource={data}
      columns={columnsCus}
      pagination={false}
      onChange={onChange}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits_cus = 0;
        let total_amount_order_cus = 0;
        pageData.forEach(({ profits_cus, amount_order_cus }) => {
          total_profits_cus += parseInt(profits_cus.replace(/[^\d]/g, ''));
          total_amount_order_cus += parseInt(amount_order_cus.replace(/[^\d]/g, ''));
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_amount_order_cus.toLocaleString('vi-VN')}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {formatCurrency(total_profits_cus+"")}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableCustomer;
