import React from 'react'

import prismadb from "@/lib/prismadb";
import useAuthCheck from '@/hooks/auth-check';
import StoreSwitcher from './StoreSwitcher';
import { UserButton } from '@clerk/nextjs';
import MainNav from './MainNav';

const Navbar = async () => {
  const currentUserId = useAuthCheck();
  const stores = await prismadb.store.findMany({
    where: {
      userId: currentUserId
    }
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
