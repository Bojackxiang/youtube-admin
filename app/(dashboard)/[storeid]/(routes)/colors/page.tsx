import React from "react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { ColorCol } from "./components/columns";
import ColorClient from "./components/ColorClient";

interface ColorsProps {
  params: {
    storeid: string;
  };
}

const ColorsPage = async ({ params: { storeid } }: ColorsProps) => {
  if (!storeid) {
    redirect("/");
  }

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColor: ColorCol[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColor} />
      </div>
    </div>
  );
};

export default ColorsPage;
