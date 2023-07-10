import prismadb from "@/lib/prismadb";
import { getStoreById } from "@/request/store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const POSTPathAlias = "[POST]";

// post request
export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { storeid } = params;
    const { userId } = auth();

    const body = await req.json();
    const { name, billboardId } = body;

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: storeid,
      },
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}

