import { auth } from '@clerk/nextjs';
import {redirect} from 'next/navigation'
import React, { use } from 'react'

const useAuthCheck = () => {
  const {userId} = auth();

  if(!userId){
    redirect("/sign-in")
  }

  return userId;
}

export default useAuthCheck
