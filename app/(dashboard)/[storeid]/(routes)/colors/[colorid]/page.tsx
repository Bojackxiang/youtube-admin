import React from "react";
import SizeForm from "../components/ColorForm";
import prismadb from "@/lib/prismadb";

interface SizeFormPagePage {
  params: {
    sizeId: string;
  };
}

const SizeFormPage = async ({ params }: SizeFormPagePage) => {
  const { sizeId } = params;

  const billboard = await prismadb.size.findFirst({
    where: {
      id: sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={billboard} />
      </div>
    </div>
  );
};

export default SizeFormPage;
