"use client";

import { useEffect, useState } from "react";

function List() {
  let 상품 = ["tomato", "pasta", "coconut"];
  const [count, setCount] = useState([]);
  useEffect(() => {
    let copy = [...count];
    상품.map(() => {
      copy.push(0);
      setCount(copy);
    });
  }, []);
  return (
    <div>
      <h2 className="title">Products</h2>
      <div className="flex">
        {상품.map((item, index) => {
          return (
            <div className="food" key={index}>
              <img
                src={`./food${index + 1}.jpg`}
                alt={item}
                width={200}
                height={200}
              />
              {/* <Image
                src={require(`@/assets/food${index + 1}.jpg`)}
                alt={item}
                width={200}
                height={200}
                서버 클라이언트여야 사용가능
              /> */}
              <h4>{item} $40</h4>
              <span>{count[index]}</span>
              <button
                onClick={() => {
                  let copy = [...count];
                  copy[index]++;
                  setCount(copy);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  let copy = [...count];
                  copy[index]--;
                  setCount(copy);
                }}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
