"use server";

import { siteConfig } from "@/config/site";
import { Product } from "@/config/types";

const getProducts = async () => {
  const res = await fetch(`${siteConfig.api_url}/products?sort=desc`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const filterProducts = async (search: string, category: string) => {
  let products = [];

  if (category) {
    const res = await fetch(
      `${siteConfig.api_url}/products/category/${category}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    products = await res.json();
  }
  if (search) {
    if (!products.length) {
      products = await getProducts();
    }
    products = products.filter((product: Product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  return products;
};

export const clearFilters = async () => {
  return await getProducts();
};
