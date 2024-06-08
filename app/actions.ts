"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { Product } from "@/config/types";

export const getProducts = async () => {
  const res = await fetch(`${siteConfig.api_url}/products?sort=desc`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(`${siteConfig.api_url}/products/categories`);

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

export const getProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`${siteConfig.api_url}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const addProduct = async (data: FormData) => {
  const res = await fetch(`${siteConfig.api_url}/products`, {
    method: "POST",
    body: JSON.stringify({
      title: data.get("title"),
      price: data.get("price"),
      description: data.get("description"),
      image: data.get("image"),
      category: data.get("category"),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  revalidatePath("/");

  redirect("/");
};

export const editProduct = async (data: FormData) => {
  const res = await fetch(`${siteConfig.api_url}/products/${data.get("id")}`, {
    method: "PUT",
    body: JSON.stringify({
      title: data.get("title"),
      price: data.get("price"),
      description: data.get("description"),
      image: data.get("image"),
      category: data.get("category"),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  revalidatePath(`/products/${data.get("id")}`);

  redirect(`/products/${data.get("id")}`);
};
