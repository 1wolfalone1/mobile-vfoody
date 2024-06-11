const menu = [
  { id: 1, name: 'Bánh mì', price: 20000, category: 'Ăn sáng', quantity: 10 },
  { id: 2, name: 'Phở', price: 50000, category: 'Ăn trưa', quantity: 5 },
  { id: 3, name: 'Cơm gà', price: 40000, category: 'Ăn trưa', quantity: 8 },
  { id: 4, name: 'Bún chả', price: 45000, category: 'Ăn trưa', quantity: 3 },
  { id: 5, name: 'Bánh tráng trộn', price: 25000, category: 'Ăn vặt', quantity: 15 },
  { id: 6, name: 'Bánh xèo', price: 35000, category: 'Ăn tối', quantity: 7 },
  { id: 7, name: 'Gỏi cuốn', price: 30000, category: 'Ăn trưa', quantity: 12 },
  { id: 8, name: 'Bún riêu cua', price: 40000, category: 'Ăn trưa', quantity: 6 },
  { id: 9, name: 'Bánh canh', price: 35000, category: 'Ăn trưa', quantity: 9 },
  { id: 10, name: 'Bánh bèo', price: 25000, category: 'Ăn sáng', quantity: 8 },
  { id: 11, name: 'Bánh cuốn', price: 30000, category: 'Ăn sáng', quantity: 10 },
  { id: 12, name: 'Bún bò Huế', price: 45000, category: 'Ăn trưa', quantity: 4 },
  { id: 13, name: 'Bánh canh cua', price: 35000, category: 'Ăn trưa', quantity: 7 },
  { id: 14, name: 'Bánh bột lọc', price: 20000, category: 'Ăn vặt', quantity: 11 },
  { id: 15, name: 'Bánh khoái', price: 30000, category: 'Ăn tối', quantity: 6 },
  { id: 16, name: 'Bánh tráng nướng', price: 25000, category: 'Ăn vặt', quantity: 9 },
  { id: 17, name: 'Bánh bao', price: 20000, category: 'Ăn sáng', quantity: 12 },
  { id: 18, name: 'Bún mắm', price: 40000, category: 'Ăn trưa', quantity: 5 },
  { id: 19, name: 'Bánh flan', price: 35000, category: 'Ăn vặt', quantity: 8 },
  { id: 20, name: 'Bánh tét', price: 30000, category: 'Ăn sáng', quantity: 7 },
  { id: 21, name: 'Trà sữa', price: 30000, category: 'Ăn sáng', quantity: 7 },
  { id: 22, name: 'Bún thịt nướng', price: 30000, category: 'Ăn sáng', quantity: 7 },
  { id: 23, name: 'Cơm sườn', price: 30000, category: 'Ăn sáng', quantity: 7 },
  { id: 24, name: 'Bánh căng', price: 30000, category: 'Ăn sáng', quantity: 7 },
  { id: 25, name: 'Bún đậu', price: 30000, category: 'Ăn sáng', quantity: 7 },
];

const categoryList = [
  { id: 1, name: 'Ăn Trưa' },
  { id: 2, name: 'Ăn Sáng' },
  { id: 3, name: 'Ăn tối' },
  { id: 4, name: 'Ăn vặt' },
  { id: 5, name: 'Giải khát' },
  { id: 6, name: 'Nhâm nhi' },
];

const vouchers = [
  { id: 1, name: 'Sale Sập Nền', quantity: 25, dueDate: '2024-06-30' },
  { id: 2, name: 'Giảm Giá Cực Sốc', quantity: 20, dueDate: '2024-06-30' },
  { id: 3, name: 'Chào Mừng Thành Viên', quantity: 30, dueDate: '2024-06-30' },
  { id: 4, name: 'Điểm Thưởng Vàng', quantity: 50, dueDate: '2024-06-30' },
  { id: 5, name: 'Mừng Lễ ', quantity: 20, dueDate: '2024-06-30' },
  { id: 6, name: 'Chào bạn mới', quantity: 100, dueDate: '2024-06-30' },
  { id: 7, name: 'Mã Giảm Giá Bí Mật', quantity: 8, dueDate: '2024-06-30' },
  { id: 8, name: 'Ưu Đãi Tháng', quantity: 20, dueDate: '2024-06-30' },
  { id: 9, name: 'Mừng trở lại', quantity: 5, dueDate: '2024-06-30' },
  { id: 10, name: 'Mừng khai trương', quantity: 20, dueDate: '2024-06-30' },
  { id: 11, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 12, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 13, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 14, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 15, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 16, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 17, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 18, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 19, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 20, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 21, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 22, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 23, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 24, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
  { id: 25, name: 'Mừng trở lại', quantity: 20, dueDate: '2024-06-30' },
];

const orders = [
  {
    id: 1,
    customerName: 'Đen Vâu',
    totalPrice: 85000,
    date: '2024-06-08 10:23:22',
  },
  {
    id: 2,
    customerName: 'Lưu Diệc Phi',
    totalPrice: 138250,
    date: '2024-06-08 10:20:22',
  },
  {
    id: 3,
    customerName: 'Triệu Lộ Tư',
    totalPrice: 40000,
    date: '2024-06-08 10:12:22',
  },
  {
    id: 4,
    customerName: 'Kiều Chi',
    totalPrice: 82500,
    date: '2024-06-08 10:10:22',
  },
  {
    id: 5,
    customerName: 'Rosé',
    totalPrice: 100235,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 6,
    customerName: 'Triệu Lệ Dĩnh',
    totalPrice: 81800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 7,
    customerName: 'Mạc Văn Khoa',
    totalPrice: 127000,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 8,
    customerName: 'Trường Giang',
    totalPrice: 16800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 9,
    customerName: 'Jack 5 củ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 10,
    customerName: 'Thùy Chi',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 11,
    customerName: 'Vũ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 12,
    customerName: 'Mạc Văn Khoa',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 13,
    customerName: 'Trường Giang',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 14,
    customerName: 'Triệu Lệ Dĩnh',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 15,
    customerName: 'Thùy Chi',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 16,
    customerName: 'Triệu Lệ Dĩnh',
    totalPrice: 81800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 17,
    customerName: 'Mạc Văn Khoa',
    totalPrice: 127000,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 18,
    customerName: 'Trường Giang',
    totalPrice: 16800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 19,
    customerName: 'Jack 5 củ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 20,
    customerName: 'Jack 5 củ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 21,
    customerName: 'Vũ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 22,
    customerName: 'Mạc Văn Khoa',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 23,
    customerName: 'Trường Giang',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 24,
    customerName: 'Triệu Lệ Dĩnh',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 25,
    customerName: 'Thùy Chi',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 26,
    customerName: 'Triệu Lệ Dĩnh',
    totalPrice: 81800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 27,
    customerName: 'Mạc Văn Khoa',
    totalPrice: 127000,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 28,
    customerName: 'Trường Giang',
    totalPrice: 16800,
    date: '2024-06-08 10:05:22',
  },
  {
    id: 29,
    customerName: 'Jack 5 củ',
    totalPrice: 81500,
    date: '2024-06-08 10:05:22',
  },
];

const notification = [
  {
    id: 1,
    customerName: 'Đen Vâu',
    product: {
      name: 'Mỳ Quảng',
      quantity: 2,
    },
  },
  {
    id: 2,
    customerName: 'Jack 5tr',
    product: {
      name: 'Cháo thịt bằm',
      quantity: 1,
    },
  },
  {
    id: 3,
    customerName: 'Sơn Tùng',
    product: {
      name: 'Coffee',
      quantity: 3,
    },
  },
  {
    id: 4,
    customerName: 'Kiều Chi',
    product: {
      name: 'Trà sữa trân châu',
      quantity: 2,
    },
  },
  {
    id: 5,
    customerName: 'Rosé',
    product: {
      name: 'Hambuger',
      quantity: 1,
    },
  },
  {
    id: 6,
    customerName: 'Vũ',
    product: {
      name: 'Cơm gà xối mỡ',
      quantity: 4,
    },
  },
  {
    id: 7,
    customerName: 'Mạc Văn Khoa',
    product: {
      name: 'Bún đậu mắm tôm',
      quantity: 2,
    },
  },
  {
    id: 8,
    customerName: 'Trường Giang',
    product: {
      name: 'Nem nướng',
      quantity: 3,
    },
  },
  {
    id: 9,
    customerName: 'Tùng Dương',
    product: {
      name: 'Hủ tiếu bò viên',
      quantity: 5,
    },
  },
  {
    id: 10,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
  {
    id: 11,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
  {
    id: 12,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
  {
    id: 13,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
  {
    id: 14,
    customerName: 'Thùy Chi',
    product: {
      name: 'Bún thịt nướng',
      quantity: 2,
    },
  },
];

export { categoryList, menu, vouchers, orders, notification };
