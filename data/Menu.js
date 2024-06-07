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
const categories = menu.map((item) => item.category);
const categoryList = [
  { id: 1, name: 'Ăn Trưa' },
  { id: 2, name: 'Ăn Sáng' },
  { id: 3, name: 'Ăn tối' },
  { id: 4, name: 'Ăn vặt' },
];

export { categoryList, menu };
