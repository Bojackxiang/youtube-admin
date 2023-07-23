import { generateToken, passwordCompare } from "@/lib/jwt";
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
    const { email, password: encodedPassword } = body;
    const { storeid } = params;

    if (!email) {
      return new NextResponse("Username is required", { status: 400 });
    }

    if (!encodedPassword) {
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

    const foundUser = await prismadb.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      return new NextResponse("User not found", { status: 400 });
    }

    const { password } = foundUser;
    const compareResult = await passwordCompare(foundUser.password, password);

    if (!compareResult) {
      return new NextResponse("Username / password is not correct", {
        status: 400,
      });
    }

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      storeid: store.id,
    });

    return NextResponse.json({
      token,
    });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
