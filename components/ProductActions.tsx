"use client";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import React from "react";

import { deleteProduct } from "@/app/actions";

const ProductActions = ({ id }: { id: number }) => {
  return (
    <>
      <Button as={Link} color="warning" href={`/products/${id}/edit`}>
        Edit
      </Button>
      <Button
        className="ml-5"
        color="danger"
        type="submit"
        onClick={() => deleteProduct(id)}
      >
        Delete
      </Button>
    </>
  );
};

export default ProductActions;
