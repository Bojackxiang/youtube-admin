'use client'
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";



export default function RootPage() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  return (
    <section>
      <div>
        <UserButton />
        <Button onClick={onOpen}>Open Modal</Button>
      </div>
    </section>
  );
}
