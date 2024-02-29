"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginBtn() {
  useEffect(() => {
    localStorage.getItem("mode");
  }, []);

  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      로그인
    </button>
  );
}
