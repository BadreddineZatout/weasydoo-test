"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";

import Filters from "./filters";

import { Product, ProductsProps } from "@/config/types";
import { clearFilters, filterProducts } from "@/app/actions";

const Products = (props: ProductsProps) => {
  const [products, setProducts] = useState(props.products);

  const filter = async (search: string, category: string) => {
    setProducts(await filterProducts(search, category));
  };

  const clear = async () => {
    setProducts(await clearFilters());
  };

  return (
    <>
      <div className="w-1/4">
        <Filters
          categories={props.categories}
          clearFilters={clear}
          filterProducts={filter}
        />
      </div>
      <div className="w-3/4 grid grid-cols-3 gap-5">
        {products.map((product: Product) => (
          <Card key={product.id} className="py-4 col-span-1 h-fit">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{product.price}$</p>
              <small className="text-default-500">{product.category}</small>
              <h4 className="font-bold text-large">{product.title}</h4>
            </CardHeader>
            <CardBody className="overflow-hidden py-2 w-[270]">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={product.image}
                width={270}
              />
              <CardFooter className="flex justify-end">
                <Link className="text-lg" href={`/products/${product.id}`}>
                  Details
                </Link>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
