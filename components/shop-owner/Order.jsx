import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { DataTable, Provider } from 'react-native-paper';
import { formatDate, formatNumberVND } from '../../utils/MyUtils';
import { orders } from '../../data/Menu';

const Item = ({ item }) => (
  <ScrollView>
    <DataTable className="my-1">
      <DataTable.Row key={item.id}>
        <DataTable.Cell className="flex-1">
          <Text className="text-sm">{item.customerName}</Text>
        </DataTable.Cell>
        <DataTable.Cell className="flex-1">
          <Text className="text-sm pl-4">{formatNumberVND(item.totalPrice)}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric className="flex-1">
          <Text className="text-sm">{formatDate(item.date)}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </ScrollView>
);

export default function Order() {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const maxItemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / maxItemsPerPage);
  const from = page * maxItemsPerPage;
  const to = Math.min((page + 1) * maxItemsPerPage, orders.length);
  useEffect(() => {
    setPage(0);
  }, []);
  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  return (
    <Provider>
      <ScrollView>
        <DataTable className="p-4">
          <DataTable.Header className="bg-gray-200">
            <DataTable.Title>Tên khách hàng</DataTable.Title>
            <DataTable.Title>Tổng tiền hóa đơn</DataTable.Title>
            <DataTable.Title numeric>Thời gian giao dịch</DataTable.Title>
          </DataTable.Header>

          {orders.slice(from, to).map((item) => (
            <Item
              item={item}
              key={item.id}
            />
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${orders.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={maxItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </DataTable>
      </ScrollView>
    </Provider>
  );
}
