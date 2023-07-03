import useAuthCheck from "@/hooks/auth-check";
import prismadb from "@/lib/prismadb";
import React from "react";

const DashboardPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const currentUserId = useAuthCheck();

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: currentUserId,
    },
  });

  return <section>Store name: {store?.name}</section>;
};

export default DashboardPage;
