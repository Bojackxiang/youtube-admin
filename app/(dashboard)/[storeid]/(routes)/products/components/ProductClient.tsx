"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { ProductCol } from "./columns";
import DataTable from "@/components/ui/DataTable";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";

interface ProductProps {
  data: ProductCol[];
}

const ProductClient = ({ data }: ProductProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Are you sure you want to delete the product?"
        />
        <Button onClick={() => router.push(`/${params.storeid}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
