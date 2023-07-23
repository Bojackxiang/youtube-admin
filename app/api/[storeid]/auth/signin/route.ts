import { restResponse } from "@/helper/repsonse";
import { decodeStoreId, generateToken, passwordCompare } from "@/lib/jwt";
import prismadb from "@/lib/prismadb";

const POSTPathAlias = "[POST]";

type ParamsProps = {
  params: { storeid: string };
};

// post request
export async function POST(req: Request, { params }: ParamsProps) {
  try {
    const body = await req.json();
    const { storeToken, email, password: rawPassword } = body;
    const { storeid } = params;

    // check of the request send from store
    if (!storeToken) {
      return restResponse("Email is required", false, {}, 400);
    }
    const decodedStoreId = await decodeStoreId(storeToken);
    if (decodedStoreId === "") {
      return restResponse("Email is required", false, {}, 400);
    }

    // validation and check user info
    if (!email) {
      return restResponse("Email is required", false, {}, 400);
    }

    if (!rawPassword) {
      return restResponse("Password is required", false, {}, 400);
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: storeid,
      },
    });

    if (!store) {
      return restResponse("Store id is invalid", false, {}, 400);
    }

    const foundUser = await prismadb.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      return restResponse("User not found", false, {}, 404);
    }

    const { password } = foundUser;

    const compareResult = await passwordCompare(password, rawPassword);

    if (!compareResult) {
      return restResponse("Email / password is not correct", false, {}, 400);
    }

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      storeid: store.id,
    });

    return restResponse("Login success", true, { token });
  } catch (error) {
    return restResponse("Something wrong, try again later", false,);
  }
}
