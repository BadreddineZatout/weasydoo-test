import React from "react";
import { Button, Image, Link, Progress } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { Product } from "@/config/types";

async function getData(id: number): Promise<Product> {
  const res = await fetch(`${siteConfig.api_url}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getData(params.id);

  async function deleteProduct(formData: FormData) {
    "use server";
    // const res = await fetch(`${siteConfig.api_url}/products/${product.id}`);
  }

  return (
    <div className="flex justify-between gap-10 items-start">
      <div className="w-1/3">
        <Image alt={product.title} src={product.image} />
      </div>
      <div className="w-2/3">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold w-3/4">{product.title}</h1>
            <p className="text-lg uppercase font-bold">{product.price}$</p>
            <p className="text-sm text-default-500">{product.category}</p>
          </div>
          <div className="flex">
            <Button
              as={Link}
              color="warning"
              href={`products/${product.id}/edit`}
            >
              Edit
            </Button>
            <form action={deleteProduct} className="ml-5">
              <Button color="danger" type="submit">
                Delete
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-lg font-semibold">Description</h4>
          <p>{product.description}</p>
        </div>
        <div className="mt-10 w-2/3">
          <Progress
            aria-label="Loading..."
            label={`Rating (${product.rating.count} votes)`}
            maxValue={5}
            showValueLabel={true}
            size="lg"
            value={product.rating.rate}
          />
        </div>
      </div>
    </div>
  );
}
