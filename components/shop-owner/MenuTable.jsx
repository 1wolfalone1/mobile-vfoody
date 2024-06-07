import { Pencil, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { menu } from '../../data/Menu';
import { formatNumberVND } from '../../utils/MyUtils';
import { Colors } from '../../constant';

const MenuTable = ({ showDeleteDiaglog }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const maxItemsPerPage = 10;
  const totalPages = Math.ceil(menu.length / maxItemsPerPage);
  const from = page * maxItemsPerPage;
  const to = Math.min((page + 1) * maxItemsPerPage, menu.length);
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
            <DataTable.Title className="flex-1">Tên sản phẩm</DataTable.Title>
            <DataTable.Title numeric className="flex-1 mr-9" sortDirection="descending">
              Giá
            </DataTable.Title>
            <DataTable.Title numeric className="flex-1">
              Thao tác
            </DataTable.Title>
          </DataTable.Header>

          {menu.slice(from, to).map((item) => (
            <DataTable.Row key={item.id} className="flex-row">
              <DataTable.Cell className="flex-1">{item.name}</DataTable.Cell>
              <DataTable.Cell numeric className="flex-1">
                <Text>{formatNumberVND(item.price)}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric className="flex-1">
                <View className="flex-row gap-3">
                  <Pencil color={Colors.cyan500} size={20} />
                  <Trash2 color={Colors.loss} size={20} onPress={showDeleteDiaglog} />
                </View>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${menu.length}`}
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

export default MenuTable;
