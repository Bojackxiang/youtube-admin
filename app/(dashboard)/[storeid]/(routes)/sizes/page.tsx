import React from "react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { SizeCol } from "./components/columns";
import SizeClient from "./components/SizeClient";

interface SizesProps {
  params: {
    storeid: string;
  };
}

const SizesPage = async ({ params: { storeid } }: SizesProps) => {
  if (!storeid) {
    redirect("/");
  }

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: SizeCol[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSize} />
      </div>
    </div>
  );
};

export default SizesPage;
