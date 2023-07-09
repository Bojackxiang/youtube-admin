import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[BILLBOARD_POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    console.log("POST TRIGGERED")
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    const { storeid } = params;

    // parameter validation
    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }

    // check if store belongs to current user
    const store = await prismadb.store.findUnique({
      where: {
        id: storeid,
      },
    });
    console.log(store)
    if (!store || store.userId !== userId) {
      return new NextResponse("You are not allow to change this store", {
        status: 404,
      });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        storeId: storeid,
        label,
        imageUrl,
      },
    });

    return NextResponse.json({ ...billboard });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { paramName: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }
    return NextResponse.json({});
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

