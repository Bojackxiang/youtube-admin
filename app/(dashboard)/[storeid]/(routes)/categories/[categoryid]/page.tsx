import React from "react";
import { useParams, useRouter } from "next/navigation";
import prismadb from "@/lib/prismadb";
import CategoryForm from "../components/CategoryForm";

interface CategoryIdPageProps {
  params: {
    categoryid: string;
    storeid: string;
  };
}

const CategoryIdPage = async ({ params }: CategoryIdPageProps) => {
  const { categoryid, storeid} = params;

  const category = await prismadb.category.findFirst({
    where: {
      id: categoryid,
    },
    include: {
      billboard: true,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeid,
    },
  });

  console.log(billboards)


  console.log(category)
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          initialData={category}
          billboards={billboards}
        />
      </div>
    </div>
  );
};

export default CategoryIdPage;
