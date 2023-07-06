import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const patchPathAlias = "[STORE_ID_PATCH]";
const DELETEPathAlias = "[STORE_ID_DELETE]";

/**
 * UPDATE STORE NAME
 */
export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { storeid } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const jsonData = await req.json();

    const { name } = jsonData;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!storeid) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const updatedStore = await prismadb.store.updateMany({
      where: {
        id: storeid,
        userId: userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({ updatedStore });
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

/**
 * DELETE STORE
 */
export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const {
      body: { storeid },
    } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const deletedStore = await prismadb.store.deleteMany({
      where: {
        id: storeid,
        userId: userId,
      },
    });

    return NextResponse.json({ deletedStore });
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}
