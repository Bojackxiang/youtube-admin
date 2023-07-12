import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export type ColorCol = {
  id: string;
  name: string;
  value: string; 
  createdAt: string;
};

export const columns: ColumnDef<ColorCol>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
