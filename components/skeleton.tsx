"use client";

import React from "react";
import { Skeleton } from "./ui/skeleton";

interface SkeletonLoadingProps {}

const SkeletonLoading = ({}: SkeletonLoadingProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="loader animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
    </div>
  );
};

export default SkeletonLoading;
