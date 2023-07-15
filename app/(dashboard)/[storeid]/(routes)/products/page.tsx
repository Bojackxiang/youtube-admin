import React from "react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { priceFormatter } from "@/lib/utils";
import { ProductCol } from "./components/columns";
import ProductClient from "./components/ProductClient";

interface ProductProps {
  params: {
    storeid: string;
  };
}

const ProductPage = async ({ params: { storeid } }: ProductProps) => {
  if (!storeid) {
    redirect("/");
  }

  const products = await prismadb.product.findMany({
    where: {
      storeId: storeid,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductCol[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isisArchived: item.isArchived,
    price: priceFormatter.format(item.price.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    category: item.category.name,
    size: item.size.name,
    item: item.color.name,
    color: item.color.name,
    isArchived: item.isArchived,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
