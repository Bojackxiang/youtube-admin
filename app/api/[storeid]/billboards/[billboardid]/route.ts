import BillBoard from "@/app/(dashboard)/[storeid]/(routes)/billboards/components/BillBoardClient";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const GETPathAlias = "[GET]";
const POSTPathAlias = "[BILLBOARD_POST]";
const patchPathAlias = "[PATCH]";
const DELETEPathAlias = "[DELETE]";

export async function GET(
  req: Request,
  { params }: { params: { storeid: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { billboardId, storeid } = params;

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    if (!billboard || billboard.storeId !== storeid) {
      return new NextResponse("You are not allow to change this store", {
        status: 404,
      });
    }

    return NextResponse.json({ billboard });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { billboardid: string} }
) {
  try {
    
    const { userId } = auth();
    const { label, imageUrl } = await req.json();
    console.log('label: ', label);
    console.log('billboardid: ', params.billboardid);

    if (!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardid,
      },
      data: {
        label,
        imageUrl,
        id: params.billboardid,
      }
    });

    return NextResponse.json({ billboard });
  } catch (error) {
    console.error(POSTPathAlias, error);
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { billboardid: string } }
) {
  try {
    console.log('deleting ')
    const {billboardid} = params
    const { userId } = auth();

    console.log("billboardid", billboardid)

    if(!userId) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    await prismadb.billboard.delete({
      where: {
        id: billboardid
      }
    })

    return NextResponse.json({});
  } catch (error) {
    console.error(DELETEPathAlias, error);
  }
}