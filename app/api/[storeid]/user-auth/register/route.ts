import { restResponse } from "@/helper/repsonse";
import prismadb from "@/lib/prismadb";

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
    const { email, password, phone, firstName, lastName } = body;
    console.log('password: ', password);

    if (!email || !password || !firstName || !lastName || !phone) {
      return restResponse(
        "Email, password, first name, and last name are required",
        false,
        {},
        200
      );
    }

    // verify the user
    const foundCustomer = await prismadb.customer.findFirst({
      where: {
        email: email,
        storeId: storeid,
      },
    });
    if (foundCustomer) {
      return restResponse("Email already exists", false, {}, 200);
    }

    // create the user
    const customer = await prismadb.customer.create({
      data: {
        storeId: storeid,
        email: email,
        password: password,
        phone: phone,
        firstName,
        lastName,
      },
    });

    // return information to the store
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
