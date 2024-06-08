import React from "react";
import { Button, Image, Link, Progress } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getProduct } from "@/app/actions";
import { siteConfig } from "@/config/site";

export default async function Page({ params }: { params: { id: number } }) {
  const product = await getProduct(params.id);

  async function deleteProduct(data: FormData) {
    "use server";
    const res = await fetch(
      `${siteConfig.api_url}/products/${data.get("id")}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    revalidatePath("/");

    redirect("/");
  }

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
                <Button
                  as={Link}
                  color="warning"
                  href={`/products/${product.id}/edit`}
                >
                  Edit
                </Button>
                <form action={deleteProduct} className="ml-5">
                  <input name="id" type="hidden" value={product.id} />
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
      ) : (
        <div>No Product Details</div>
      )}
    </>
  );
}
