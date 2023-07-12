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
  { params }: { params: { storeid: string; sizeid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid, sizeid } = params;
    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const response = await prismadb.size.updateMany({
      where: {
        storeId: storeid,
        id: sizeid,
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
  { params }: { params: { storeid: string; sizeid: string } }
) {
  try {
    const { storeid, sizeid } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await prismadb.size.deleteMany({
      where: {
        storeId: storeid,
        id: sizeid,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}
