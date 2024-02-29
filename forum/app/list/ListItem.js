"use client";
import Link from "next/link";
import DetailLink from "./DetailLink";
import { useState, useEffect } from "react";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((item, idx) => (
        <div className="list-item" key={idx}>
          <div>
            <Link href={`/detail/${item._id}`}>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </Link>
            <DetailLink />
          </div>
          <button
            onClick={() => {
              document.cookie = "mode=dark;";
              console.log("darkmode");
            }}
          >
            쿠키저장
          </button>
          <Link href={`/edit/${item._id}`}>✏️</Link>
          <button
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "DELETE",
                body: JSON.stringify({ id: item._id, auth: item.author }),
              });
              e.target.parentElement.style.opacity = 0;
              setTimeout(() => {
                e.target.parentElement.style.display = "none";
              }, 1000);
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}
