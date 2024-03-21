import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
const LoadingSkeleton = () => {
  return (
    // src/components/LoadingSpinner.js
    <div className="flex flex-col items-center space-y-6">
      <div className="space-y-6">
        <Skeleton className="h-10  w-[22rem]" />
        <Skeleton className="h-10  w-[22rem]" />
        <Skeleton className="h-10  w-[22rem]" />
      </div>
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full flex justify-between items-center">
          <Skeleton className="h-10  w-[10rem]" />
          <Skeleton className="h-10  w-[10rem]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-6 w-[10rem]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
