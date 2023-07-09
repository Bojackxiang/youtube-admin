
import React from 'react'
import { useParams, useRouter } from 'next/navigation';
import BillBoardForm from '../components/BillBoardForm';
import prismadb from '@/lib/prismadb';

interface BollBoardIdPageProps {
  params: {
    billboardId: string
  }
}

const BollBoardIdPage = async ({params}: BollBoardIdPageProps) => {
  const {billboardId} = params;
  
  const billboard = await prismadb.billboard.findFirst({
    where: {
      id: billboardId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BollBoardIdPage