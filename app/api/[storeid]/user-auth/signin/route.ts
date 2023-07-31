import { restResponse } from "@/helper/repsonse";
import { generateToken } from "@/lib/jwt";
import { comparePassword } from "@/lib/password-helper";
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

    // validation and check user info
    if (!email) {
      return restResponse("Email is required", false, {}, 200);
    }

    if (!rawPassword) {
      return restResponse("Password is required", false, {}, 200);
    }

    const store = await prismadb.store.findUnique({
      where: {
        id: storeid,
      },
    });

    if (!store) {
      return restResponse("Store id is invalid", false, {}, 200);
    }

    const foundUsers = await prismadb.customer.findMany({
      where: {
        email: email,
        storeId: store.id,
      },
    });

    if (foundUsers.length === 0) {
      return restResponse("User not found", false, {}, 200);
    }

    const foundUser = foundUsers[0];

    if (!foundUser) {
      return restResponse("User not found", false, {}, 200);
    }

    const { password } = foundUser;

    const compareResult = await comparePassword(rawPassword, password);

    if (!compareResult) {
      return restResponse("Email / password is not correct", false, {}, 200);
    }

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      storeid: store.id,
    });

    return restResponse("Login success", true, { token });
  } catch (error) {
    console.error(error);
    return restResponse("Something wrong, try again later", false);
  }
}
