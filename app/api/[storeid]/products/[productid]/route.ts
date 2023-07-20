import prismadb from "@/lib/prismadb";
import { getStoreById } from "@/request/store";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

// update request
export async function GET(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    
    const { storeid, productid } = params;
    

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productid,
      },
      include: {
        category: true, 
        images: true,
        size: true,
        color: true
      }
    })

    return NextResponse.json({product});
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

// update request
export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    const { userId } = auth();
    const { storeid, productid } = params;
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

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await prismadb.product.update({
      where: {
        id: productid,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
        categoryId,
        images: {
          deleteMany: {},
        },
      },
    });

    const response = await prismadb.product.update({
      where: {
        id: productid,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(patchPathAlias, error);
  }
}

/**
 * DELETE STORE
 */
export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; productid: string } }
) {
  try {
    const { storeid, productid } = params;
    console.log(productid)
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const store = await getStoreById(storeid);
    if (!store) {
      return new NextResponse("Store not found", { status: 404 });
    }

    await prismadb.product.delete({
      where: {
        id: productid,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}
