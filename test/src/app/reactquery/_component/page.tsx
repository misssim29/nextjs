"use client";

import { useQuery } from "@tanstack/react-query";
import { listApi } from "@/lib/api/listApi";

export default function ListPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["listApi"],
    queryFn: () => listApi(),
  });
  console.log(data, isLoading);
  return <div></div>;
}
