import { siteConfig } from "@/config/site";
import Products from "@/components/products";

async function getData() {
  const res = await fetch(`${siteConfig.api_url}/products?sort=desc`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getCategories() {
  const res = await fetch(`${siteConfig.api_url}/products/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  var products = await getData();
  const categories = await getCategories();

  return (
    <main className="w-full flex justify-between gap-10 items-start">
      <Products categories={categories} products={products} />
    </main>
  );
}
