import prismadb from "@/lib/prismadb";

export const getCategoryById = async (id: string) => {
  const category = await prismadb.category.findFirst({
    where: {
      id,
    },
    include: {
      billboard: true,
    }
  });

  return category;
}