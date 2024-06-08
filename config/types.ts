export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductsProps = {
  products: Product[];
  categories: string[];
};

export type FilterProps = {
  categories: string[];
  filterProducts: (search: string, category: string) => Promise<void>;
  clearFilters: () => Promise<void>;
};
