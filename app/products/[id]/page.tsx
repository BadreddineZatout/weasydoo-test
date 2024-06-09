import React from "react";
import { Image, Progress } from "@nextui-org/react";

import { getProduct } from "@/app/actions";
import ProductActions from "@/components/ProductActions";

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);

  return (
    <>
      {product ? (
        <div className="flex justify-between gap-10 items-start">
          <div className="w-1/3">
            <Image alt={product.title} src={product.image} />
          </div>
          <div className="w-2/3">
            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold w-3/4">
                  {product.title}
                </h1>
                <p className="text-lg uppercase font-bold">{product.price}$</p>
                <p className="text-sm text-default-500">{product.category}</p>
              </div>
              <div className="flex">
                <ProductActions id={product.id} />
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
      ) : (
        <div>No Product Details</div>
      )}
    </>
  );
}
