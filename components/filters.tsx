"use client";
import { Input } from "@nextui-org/input";
import React, { useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";

import { FilterProps } from "@/config/types";

const Filters = (props: FilterProps) => {
  const categories = props.categories.map((category, index) => {
    return { id: index, name: category };
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      <Input
        label="Search"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Select
        className="max-w-xs mt-5"
        items={categories}
        label="Category"
        placeholder="Select a category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        {categories.map((category) => (
          <SelectItem key={category.name}>{category.name}</SelectItem>
        ))}
      </Select>
      <div className="mt-10 flex justify-between items-center gap-10">
        <Button
          className="w-1/2"
          color="success"
          onClick={async () => {
            await props.filterProducts(search, category);
          }}
        >
          Search
        </Button>
        <Button
          className="w-1/2"
          color="danger"
          onClick={async () => {
            setSearch("");
            setCategory("");
            await props.clearFilters();
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Filters;
