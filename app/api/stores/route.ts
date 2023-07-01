import prismadb from "@/lib/prismadb";
import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";


const pathAlias = "[STORE_POST]";

/**
 * Create a store
 */
export async function POST(req: Request) {
  try {
    // check current user id
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("UnAuthorized", {
        status: 401,
      });
    }

    // check store name 
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }

    // create store 
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(pathAlias, error);
  }
}
