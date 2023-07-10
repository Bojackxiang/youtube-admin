"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import DataTable from "@/components/ui/DataTable";
import { CategoryCol, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";

interface CategoryProps {
  data: CategoryCol[];
}

const CategoryClient = ({ data }: CategoryProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Are you sure you want to delete the Category?"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="category" />
    </>
  );
};

export default CategoryClient;
