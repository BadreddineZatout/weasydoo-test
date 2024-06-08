"use server";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { Button } from "@nextui-org/button";

import { editProduct, getCategories, getProduct } from "@/app/actions";
import SelectInput from "@/components/select";

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);
  const categories = await getCategories();

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="w-full text-3xl font-bold text-center mb-10">
        Edit Product #{product.id}
      </h1>
      <form action={editProduct} className="space-y-5 text-center">
        <input name="id" type="hidden" value={product.id} />
        <Input
          label="Title"
          name="title"
          placeholder={product.title}
          type="text"
        />
        <Input
          label="Price"
          min={0}
          name="price"
          placeholder={`${product.price}`}
          type="number"
        />
        <Textarea
          label="Description"
          name="description"
          placeholder={product.description}
        />
        <Input
          label="Image Url"
          name="image"
          placeholder={product.image}
          type="text"
        />
        <SelectInput
          categories={categories.map((category: string, index: number) => {
            return { id: index, name: category };
          })}
          value={product.category}
        />
        <Button
          className="w-1/4 text-xl font-semibold"
          color="success"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
