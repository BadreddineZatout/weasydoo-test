import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { getCategories, getProducts } from "./actions";

import Products from "@/components/products";

export default async function Page() {
  var products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="w-full">
      <div className="w-full">
        <Button
          as={Link}
          className="float-right mb-10"
          color="success"
          href="products/create"
        >
          Add Product
        </Button>
      </div>
      <div className="w-full flex justify-between gap-10 items-start">
        <Products categories={categories} products={products} />
      </div>
    </main>
  );
}
