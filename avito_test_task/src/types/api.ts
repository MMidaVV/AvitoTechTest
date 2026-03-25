// Контракт категорий
export type Category = 'auto' | 'real_estate' | 'electronics';

// Параметры для категории "auto"
export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

// Параметры для категории "real_estate"
export type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

// Параметры для категории "electronics"
export type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

// Объединённый тип параметров объявления
export type ItemParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams;

// Контракт объявления
export type Item = {
  id: string
  category: Category
  title: string
  description?: string
  price: number
  params: ItemParams
  needsRevision: boolean
  createdAt: string
  updatedAt?: string
}

// Контракт первоначальных данных
export type ItemPreview = {
  id: string;
  category: "auto" | "real_estate" | "electronics";
  title: string;
  price: number;
  needsRevision: boolean;
};

// Контракт выходных данных
export type ItemsGetOut = {
  items: ItemPreview[];  
  total: number;
};

// Контракт входных данных для обновления объявления
export type ItemUpdateIn = {
  category: Category;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
};