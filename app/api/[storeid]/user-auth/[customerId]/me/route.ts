import { restResponse } from "@/helper/repsonse";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";

type ParamsProps = {
  params: { customerId: string };
};

// get request
export async function GET(
  req: Request,
  { params }: ParamsProps
) {
  try {
    // TODO: check header in the request
    const authorization = req.headers.get("authorization");
    // if (!authorization) {
    //   return restResponse("No authorization header", false, {}, 200);
    // }

    // check user id is valid
    const user = await prismadb.customer.findUnique({
      where: {
        id: params.customerId,
      },
    });

    if (!user) {
      return restResponse("No Such a user", false, {}, 200);
    }

    const { password, createdAt, updatedAt, ...rest } = user;

    return restResponse("Get user successfully", true, rest, 200);
  } catch (error) {
    console.error(GETPathAlias, error);
  }
}
