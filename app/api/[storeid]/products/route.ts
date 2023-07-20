/**
 * Handle for size main page to add size information
 */
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

// post request
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      storeid: string;
      sizeId: string;
      categoryId: string;
      colorId: string;
    };
  }
) {
  try {
    const { storeid } = params;
    const { searchParams } = new URL(req.url);
    const sizeId = searchParams.get("sizeId") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;

    const products = await prismadb.product.findMany({
      where: {
        storeId: storeid,
        sizeId: sizeId,
        categoryId: categoryId,
        colorId: colorId,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error(GETPathAlias, error);
  }
}

// post request
export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid } = params;
    const body = await req.json();
    const {
      name,
      price,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
      images,
      categoryId,
    } = body;

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const response = await prismadb.product.create({
      data: {
        storeId: storeid,
        name,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        categoryId,
      },
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}
