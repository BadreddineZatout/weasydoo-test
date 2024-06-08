"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectInput = ({
  categories,
}: {
  categories: { id: number; name: string }[];
}) => {
  return (
    <Select
      isRequired
      required
      className="mt-5"
      items={categories}
      label="Category"
      name="category"
      placeholder="Select a category"
    >
      {categories.map((category: { id: number; name: string }) => (
        <SelectItem key={category.name}>{category.name}</SelectItem>
      ))}
    </Select>
  );
};

export default SelectInput;
