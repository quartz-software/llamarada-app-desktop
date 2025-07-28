type StockCategory = "food" | "cleaning" | "maintenance";
type Stock = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category: StockCategory;
  supplyDate: string;
};
