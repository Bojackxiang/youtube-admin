import useAuthCheck from '@/hooks/auth-check'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/SettingsForm'

interface SettingPageProps {
  params: {
    storeid: string
  }
}

const SettingPage: React.FC<SettingPageProps> = async ({params: {storeid}}) => {
  const currentUserId = useAuthCheck();

  if(!currentUserId){
    redirect("/sign-in")
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeid,
      userId: currentUserId
    }
  })

  if(!store){
    redirect("/")
  }


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingPage
