import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

type ParamsProps = {
  params: { storeid: string };
};


// post request
export async function POST(req: Request, { params }: ParamsProps) {
  try {
    const body = await req.json();
    const { storeid } = params;
    const { storeToken, email, password, phone } = body;

    if (!storeToken) {
      return new NextResponse("Invalid request", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Username is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Username is required", { status: 400 });
    }

    const customer = await prismadb.customer.create({
      data: {
        storeId: storeid,
        email: email,
        password: password,
        phone: phone,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
