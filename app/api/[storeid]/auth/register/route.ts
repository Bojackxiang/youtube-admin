import { restResponse } from "@/helper/repsonse";
import { decodeStoreId } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const POSTPathAlias = "[POST]";

type ParamsProps = {
  params: { storeid: string };
};

// post request
export async function POST(req: Request, { params }: ParamsProps) {
  try {
    console.log("here");
    const body = await req.json();
    const { storeid } = params;
    const { storeToken, email, password, phone } = body;

    // check of the request send from store
    if (!storeToken) {
      return new NextResponse("Invalid request", { status: 400 });
    }
    const decodedStoreId = await decodeStoreId(storeToken);
    if (decodedStoreId === "") {
      return new NextResponse("Invalid request", { status: 400 });
    }

    // validation and create customer
    if (!storeToken || decodedStoreId === "") {
      return restResponse("Invalid request", false, {}, 400);
    }

    if (!email) {
      return restResponse("Invalid email", false, {}, 400);
    }

    if (!password) {
      return restResponse("Invalid password", false, {}, 400);
    }

    const foundCustomer = await prismadb.customer.findFirst({
      where: {
        email: email,
      },
    });
    if (foundCustomer) {
      return restResponse("Email already exist", false, {}, 400);
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
    });
  } catch (error) {
    console.error(POSTPathAlias, error);
    return new NextResponse("Something wrong, try again later", {
      status: 500,
    });
  }
}
