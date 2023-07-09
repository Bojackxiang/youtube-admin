import React from "react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import BillboardClient from "./components/BillBoardClient";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/BillBoardCol";

interface BillBoardProps {
  params: {
    storeid: string;
  };
}

const BillBoardPage = async ({ params: { storeid } }: BillBoardProps) => {
  if (!storeid) {
    redirect("/");
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("billboards: ", billboards);

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillBoardPage;
