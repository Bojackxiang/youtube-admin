"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";

interface SkeletonLoadingProps {}

const SkeletonLoading = ({}: SkeletonLoadingProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex justify-around">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-12 w-1/3" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
