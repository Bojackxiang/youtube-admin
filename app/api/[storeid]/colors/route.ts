/**
 * Handle for color main page to add color information
 */
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

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

    const response = await prismadb.color.create({
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

