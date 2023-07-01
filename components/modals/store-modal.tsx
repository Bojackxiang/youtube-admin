"use client";
const pathAlias = "components/modals/store-modal.tsx";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { API_STORES } from "@/common/contants";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Store must not be empty"),
});

const StoreModal = () => {
  const onClose = useStoreModal((state) => state.onClose);
  const isOpen = useStoreModal((state) => state.isOpen);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isNameFieldInvalid = !!form.formState.errors.name;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post(API_STORES, value);
      // do a refresh 
      window.location.assign(`/${response.data.id}`)
    } catch (error: any) {
      toast.error("Something wrong, try again laster ")
      console.error(pathAlias, error.message)
    }  finally{
      setLoading(false)
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Create the store"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className={isNameFieldInvalid ? "border-red-500" : ""}
                        placeholder="E-Commence"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={onClose} disabled={loading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
