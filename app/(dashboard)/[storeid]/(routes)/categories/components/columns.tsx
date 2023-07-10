import React from "react";
import { useParams, useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryCol = {
  id: string;
  label: string;
  billboardName: string; 
  createdAt: string;
};

export const columns: ColumnDef<CategoryCol>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardName,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
