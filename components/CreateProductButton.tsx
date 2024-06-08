"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import React from "react";

import { useAppSelector } from "@/config/hooks";

const CreateProductButton = () => {
  const token = useAppSelector((state) => state.user.token);

  if (token) {
    return (
      <Button
        as={Link}
        className="float-right mb-10"
        color="success"
        href="products/create"
      >
        Add Product
      </Button>
    );
  }

  return <></>;
};

export default CreateProductButton;
