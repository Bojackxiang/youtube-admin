import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const POSTPathAlias = "[POST]";

type ParamsProps = {
  params: { storeid: string };
};

// post request
export async function POST(req: Request, { params }: ParamsProps) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const { storeid } = params;

    if (!email) {
      return new NextResponse("Username is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Username is required", { status: 400 });
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: storeid,
      },
    });

    if (!store) {
      return new NextResponse("Store not found", { status: 400 });
    }

    return NextResponse.json({});
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
