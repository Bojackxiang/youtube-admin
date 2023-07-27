import { restResponse } from "@/helper/repsonse";
import { decodeStoreId } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";
import { sign, verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const POSTPathAlias = "[POST]";

type ParamsProps = {
  params: { storeid: string };
};

export async function OPTIONS() {
  return restResponse("ok", true, {}, 200);
}

// post request
export async function POST(req: Request, { params }: ParamsProps) {
  try {
    console.log("triggered");
    const body = await req.json();
    const { storeid } = params;
    const { storeToken, email, password, phone } = body;

    // check of the request send from store
    if (!storeToken) {
      return restResponse("Invalid store token", false, {}, 200);
    }
    const decodedStoreId = await decodeStoreId(storeToken);
    if (decodedStoreId === "") {
      return restResponse("Invalid store token", false, {}, 200);
    }

    // validation and create customer
    if (!storeToken || decodedStoreId === "") {
      return restResponse("Invalid store token", false, {}, 200);
    }

    if (!email) {
      return restResponse("Email is required", false, {}, 200);
    }

    if (!password) {
      return restResponse("Password is required", false, {}, 200);
    }

    const foundCustomer = await prismadb.customer.findFirst({
      where: {
        email: email,
      },
    });
    if (foundCustomer) {
      return restResponse("Email already exists", false, {}, 200);
    }

    const customer = await prismadb.customer.create({
      data: {
        storeId: storeid,
        email: email,
        password: password,
        phone: phone,
      },
    });

    return restResponse(
      "Create user successfully",
      true,
      {
        id: customer.id,
        email: customer.email,
        phone: customer.phone,
      },
      200
    );
  } catch (error) {
    console.error(POSTPathAlias, error);
    return restResponse("Something wrong, try again later", true, {}, 400);
  }
}
