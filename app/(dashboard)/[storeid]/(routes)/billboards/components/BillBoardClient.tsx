"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { BillboardColumn } from "./BillBoardCol";
import DataTable from "@/components/ui/DataTable";
import { columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";

interface BillBoardProps {
  data: BillboardColumn[];
}

const BillBoard = ({ data }: BillBoardProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Are you sure you want to delete the billboard?"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillBoard;
