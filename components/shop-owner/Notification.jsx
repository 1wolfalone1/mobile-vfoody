import { CircleCheckBig, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
  DataTable,
  Provider
} from 'react-native-paper';
import { Colors } from '../../constant';
import { notification } from '../../data/Menu';

const handleAccept = () => {
  console.log("Accepted");
};

const Item = ({ item, showDeleteDialog }) => (
  <ScrollView>
    <DataTable className="my-1">
      <DataTable.Row key={item.id}>
        <DataTable.Cell className="flex-1">
          <Text className="text-sm">{item.customerName}</Text>
        </DataTable.Cell>
        <DataTable.Cell className="flex-1 pl-8">
          <Text className="text-sm">{item.product.name}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric className="flex-1 pr-8">
          <Text className="text-sm">{item.product.quantity}</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric className="flex-1">
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <CircleCheckBig color={Colors.success} size={24} onPress={handleAccept} />
            <Trash2 color={Colors.loss} size={24} onPress={showDeleteDialog} />
          </View>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  </ScrollView>
);

export default function Notification({ showDeleteDialog }) {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const maxItemsPerPage = 10;
  const totalPages = Math.ceil(notification.length / maxItemsPerPage);
  const from = page * maxItemsPerPage;
  const to = Math.min((page + 1) * maxItemsPerPage, notification.length);
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
            <DataTable.Title numeric>Tên sản phẩm</DataTable.Title>
            <DataTable.Title numeric>Số lượng</DataTable.Title>
            <DataTable.Title numeric>Thao tác</DataTable.Title>
          </DataTable.Header>

          {notification.slice(from, to).map((item) => (
            <Item
              item={item}
              key={item.id}
              showDeleteDialog={showDeleteDialog}
            />
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${notification.length}`}
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
