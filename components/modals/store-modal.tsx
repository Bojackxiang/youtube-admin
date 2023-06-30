"use client";

import React from "react";
import { Modal } from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Create the store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Store creating
    </Modal>
  );
};

export default StoreModal;
