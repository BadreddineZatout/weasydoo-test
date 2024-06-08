"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectInput = ({
  categories,
  value,
}: {
  categories: { id: number; name: string }[];
  value?: string;
}) => {
  return (
    <Select
      className="mt-5"
      isRequired={value ? false : true}
      items={categories}
      label="Category"
      name="category"
      placeholder={value}
      required={value ? false : true}
    >
      {categories.map((category: { id: number; name: string }) => (
        <SelectItem key={category.name}>{category.name}</SelectItem>
      ))}
    </Select>
  );
};

export default SelectInput;
