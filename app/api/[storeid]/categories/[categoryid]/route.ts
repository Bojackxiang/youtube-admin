import prismadb from "@/lib/prismadb";
import { getCategoryById } from "@/request/category";
import { getStoreById } from "@/request/store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

// get request
export async function GET(
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
    console.error(GETPathAlias, error);
  }
}

// post request
export async function POST(
  req: Request,
  { params }: { params: { paramName: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {} = body;

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    return NextResponse.json({});
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}

// update request
export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; categoryid: string } }
) {
  try {
    const { storeid, categoryid } = params;
    const { userId } = auth();
    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const existedStore = await getStoreById(storeid);
    if (!existedStore) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const existedCategory = await getCategoryById(categoryid);
    if (!existedCategory) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const { id: cateid } = existedCategory;
    await prismadb.category.update({
      where: {
        id: cateid,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json({});
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
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    return NextResponse.json({});
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}
