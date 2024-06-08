import { getCategories, getProducts } from "./actions";

import Products from "@/components/products";
import CreateProductButton from "@/components/CreateProductButton";

export default async function Page() {
  var products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="w-full">
      <div className="w-full">
        <CreateProductButton />
      </div>
      <div className="w-full flex justify-between gap-10 items-start">
        <Products categories={categories} products={products} />
      </div>
    </main>
  );
}
