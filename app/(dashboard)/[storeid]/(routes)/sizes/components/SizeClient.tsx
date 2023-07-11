"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import DataTable from "@/components/ui/DataTable";

import { ApiList } from "@/components/ui/ApiList";

import { SizeCol, columns } from './columns'

interface SizeClientProps {
  data: SizeCol[];
}

const SizeClient = ({ data }: SizeClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Title for the sizes page"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API Calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
