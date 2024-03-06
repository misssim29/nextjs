"use client";

import userSlice from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { RootState } from "@/store/reducer";
import ListPage from "./_component/page";

export default function ReactQueryPage() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.user.count);
  const name = useSelector((state: RootState) => state.user.user);

  const fncPlus = () => {
    dispatch(userSlice.actions.setCount(count + 1));
  };

  return (
    <div>
      <span>{count}</span>
      <span>{name}</span>
      <button onClick={fncPlus}>+</button>
      <ListPage />
    </div>
  );
}
