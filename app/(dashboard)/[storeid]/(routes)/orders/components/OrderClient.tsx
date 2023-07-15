"use client";

import React from "react";
import { Heading } from "@/components/ui/Heading";
import { Separator } from "@radix-ui/react-separator";
import { OrderCol } from "./columns";
import DataTable from "@/components/ui/DataTable";
import { columns } from "./columns";

interface OrderProps {
  data: OrderCol[];
}

const OrderClient = ({ data }: OrderProps) => {

  return (
    <>
      <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default OrderClient;
