'use client'
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";



export default function RootPage() {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
