"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Container } from "@/components/ui/react/design-system";
import { Card, CardHeader, CardFooter } from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";
import { Skeleton } from "@/components/ui/primitives/skeleton";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card className="group relative flex h-96 flex-col overflow-hidden rounded-xl border bg-cover bg-center p-0">
      <CardHeader className="overflow-hidden p-0">
        {!imgLoaded && (
          <Skeleton className="absolute inset-0 flex h-full w-full items-center justify-center">
            <ImageIcon className="size-10 animate-pulse" />
          </Skeleton>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className={cn(
            "scale-100 transition-transform duration-300 group-hover:scale-110",
            !imgLoaded && "invisible",
          )}
          onLoad={() => setImgLoaded(true)}
        />
        <span className="absolute right-4 top-4 rounded-lg bg-primary px-3 py-1 font-manrope text-xs text-primary-foreground">
          New
        </span>
      </CardHeader>
      <CardFooter className="absolute bottom-0 mt-auto flex w-full items-end justify-between px-0">
        <span className="flex h-10 items-center justify-center rounded-tr-xl bg-white px-6 font-manrope text-lg text-foreground">
          {product.price}
        </span>
        <Button className="rounded-none rounded-tl-xl" size="lg">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductsBlock() {
  const products = [
    {
      id: 1,
      name: "Calvero Gold Watch",
      description: "Gold frame, black dial.",
      price: "$19,800",
      image: "/images/product/1.webp",
    },
    {
      id: 2,
      name: "Calvero Noir Watch",
      description: "Gold hands, black face.",
      price: "$17,500",
      image: "/images/product/2.webp",
    },
    {
      id: 3,
      name: "Calvero Coffee Machine",
      description: "Steel body, barista quality.",
      price: "$4,200",
      image: "/images/product/3.webp",
    },
    {
      id: 4,
      name: "Calvero T-Shirt",
      description: "Organic cotton, special stitch.",
      price: "$390",
      image: "/images/product/4.webp",
    },
    {
      id: 5,
      name: "Calvero Silk Tie",
      description: "Pure silk, modern design.",
      price: "$650",
      image: "/images/product/5.webp",
    },
    {
      id: 6,
      name: "Calvero Hat",
      description: "Handmade, quality fabric.",
      price: "$480",
      image: "/images/product/6.webp",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}

export { ProductCard, ProductsBlock };
export type { ProductCardProps };
