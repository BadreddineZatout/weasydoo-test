"use server";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { Button } from "@nextui-org/button";

import { addProduct, getCategories } from "@/app/actions";
import SelectInput from "@/components/select";

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="w-full text-3xl font-bold text-center mb-10">
        Add New Product
      </h1>
      <form action={addProduct} className="space-y-5 text-center">
        <Input isRequired required label="Title" name="title" type="text" />
        <Input
          isRequired
          required
          label="Price"
          min={0}
          name="price"
          type="number"
        />
        <Textarea
          isRequired
          required
          label="Description"
          name="description"
          placeholder="Enter your description"
        />
        <Input
          isRequired
          required
          label="Image Url"
          name="image"
          placeholder="Enter Image Url ex: www.url.com"
          type="text"
        />
        <SelectInput
          categories={categories.map((category: string, index: number) => {
            return { id: index, name: category };
          })}
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
