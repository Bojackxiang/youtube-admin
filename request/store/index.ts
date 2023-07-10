import prismadb from "@/lib/prismadb";
import { tr } from "date-fns/locale";

export const getStoreById = async (storeId: string) => {
  try {
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
    });

    return store;
  } catch (error) {
    console.error("getStoreById", error);
  }
}

