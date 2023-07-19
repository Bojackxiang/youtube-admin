import React from "react";
import ProductForm from "../components/ProductForm";
import prismadb from "@/lib/prismadb";

interface ProductCreateFormProps {
  params: {
    productId: string;
    storeId: string;
  };
}

const ProductCreatePage = async ({ params }: ProductCreateFormProps) => {
  const { productId, storeId } = params;

  const product = await prismadb.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  // categories,
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });
  // sizes,
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });
  // colors
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={null}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductCreatePage;
