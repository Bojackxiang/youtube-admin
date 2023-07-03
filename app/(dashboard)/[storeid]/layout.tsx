import Navbar from "@/components/Navbar";
import useAuthCheck from "@/hooks/auth-check";
import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import {redirect} from 'next/navigation'


export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    storeId: string
  }
}) {

  const currentUserId = useAuthCheck();

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: currentUserId
    }
  })

  if(!store){
    redirect("/")
  }

  return (
    <section className="">
      <Navbar/>
      {children}
    </section>
  );
}

// layout 一般都是 async 的component，这样就能帮组组建获取数据
