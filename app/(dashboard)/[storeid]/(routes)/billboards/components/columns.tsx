import React from "react";
import { useParams, useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillBoardCol = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillBoardCol>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>,
  },
];
