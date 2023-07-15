import React from "react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { CategoryCol } from "./components/columns";
import CategoryClient from "./components/CategoriesClient";

interface CategoryProps {
  params: {
    storeid: string;
  };
}

const CategoryPage = async ({ params: { storeid } }: CategoryProps) => {
  if (!storeid) {
    redirect("/");
  }

  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeid,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryCol[] = categories.map((item) => ({
    id: item.id,
    label: item.name,
    billboardName: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
