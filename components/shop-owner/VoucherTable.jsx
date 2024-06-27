import { Pencil, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { vouchers } from '../../data/Menu';
import { Colors } from '../../constant';

function formatDateToSeconds(dateString) {
  const dateObj = new Date(dateString); // Parse the date string
  const hours = dateObj.getHours().toString().padStart(2, '0'); // Add leading zero for single-digit hours
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Months are zero-indexed (January is 0)
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

const VoucherTable = ({ showDeleteDialog }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const maxItemsPerPage = 10;
  const totalPages = Math.ceil(vouchers.length / maxItemsPerPage);
  const from = page * maxItemsPerPage;
  const to = Math.min((page + 1) * maxItemsPerPage, vouchers.length);
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
    <View className="p-4">
      {/* Data Table */}
      <ScrollView>
        <DataTable>
          <DataTable.Header className="bg-gray-200">
            <DataTable.Title className="flex-1">Tên khuyến mãi</DataTable.Title>
            <DataTable.Title numeric className="flex-1">
              Số lượng
            </DataTable.Title>
            <DataTable.Title numeric className="flex-1">
              Thời hạn
            </DataTable.Title>
            <DataTable.Title numeric className="flex-1">
              Thao tác
            </DataTable.Title>
          </DataTable.Header>

          {vouchers.slice(from, to).map((item) => (
            <DataTable.Row key={item.id} className="flex-row">
              <DataTable.Cell className="flex-1">
                <Text className='text-xs'>{item.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric className="flex-1 pr-10">
                <Text>{item.quantity}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric className="flex-1">
                <Text>{formatDateToSeconds(item.dueDate)}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric className="flex-1">
                <View className="flex-row gap-2">
                  <Pencil color={Colors.cyan500} size={20} />
                  <Trash2 color={Colors.loss} size={20} onPress={showDeleteDialog} />
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${vouchers.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={maxItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default VoucherTable;
