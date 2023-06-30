'use client'

import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";

export default function RootPage() {


  return (
    <section>
      <div>
        <UserButton />
      </div>
    </section>
  );
}
