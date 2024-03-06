"use client";

import getList from "../_lib/getList";
import { useQuery } from "@tanstack/react-query";

interface TypeItem {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const QueryList = () => {
  const { data } = useQuery({
    queryKey: ["lists", "item"],
    queryFn: getList,
    staleTime: 5 * 1000, /// 5초마다 새로 가져옴
  });
  return (
    <div>
      {data.map((item: TypeItem) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default QueryList;
