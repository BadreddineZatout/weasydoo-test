import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Link,
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

async function getData() {
  const res = await fetch(`${siteConfig.api_url}/products?sort=desc`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="w-full flex justify-between items-start">
      <div className="w-1/4">Filters</div>
      <div className="w-3/4 grid grid-cols-3 gap-5">
        {data.map((product: Product) => (
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
    </main>
  );
}
