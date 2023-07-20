/**
 * Handle for size main page to add size information
 */
import prismadb from "@/lib/prismadb";
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
  { params }: { params: { storeid: string } }
) {
  try {
    const { storeid } = params;

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: storeid,
      },
    });

    return NextResponse.json({ sizes });
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

// post request
export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid } = params;
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const response = await prismadb.size.create({
      data: {
        storeId: storeid,
        name,
        value,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
