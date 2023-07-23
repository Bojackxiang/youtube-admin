import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const POSTPathAlias = "[POST]";

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

    return NextResponse.json({
      email: customer.email,
      phone: customer.phone,
      id: customer.id,
      storeId: storeid,
    });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
