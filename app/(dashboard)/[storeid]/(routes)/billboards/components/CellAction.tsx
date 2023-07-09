import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";
interface CellActionProps {
  data: {
    id: string;
    label: string;
    createdAt: string;
  };
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { id } = data;
  const { storeid, billboardid } = params;
  const [open, setOpen] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard id copied successfully");
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${storeid}/billboards/${id}`);
      toast.success("Billboard deleted successfully");
      router.refresh();
      setOpen(false);
      router.push(`/${storeid}/billboards`)
    } catch (error) {
      toast.success("Something wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only"> Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/${storeid}/billboards/${id}`)}
          >
            Enter Page
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <span className="text-red-500">Delete Billboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy()}>Copy id</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
