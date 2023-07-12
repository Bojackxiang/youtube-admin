import prismadb from "@/lib/prismadb";
import { getStoreById } from "@/request/store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

// update request
export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; colorid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid, colorid } = params;
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const response = await prismadb.color.updateMany({
      where: {
        storeId: storeid,
        id: colorid,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

/**
 * DELETE STORE
 */
export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; colorid: string } }
) {
  try {
    const { storeid, colorid } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await prismadb.color.deleteMany({
      where: {
        storeId: storeid,
        id: colorid,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}
