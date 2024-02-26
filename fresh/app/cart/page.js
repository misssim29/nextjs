import Button from "@/components/button";
import { age, nickname } from "../cart/data";
import Hello from "@/components/hello";

function Cart() {
  const 장바구니 = [
    {
      name: "상품명",
      coin: "$40",
      num: 1,
    },
    {
      name: "바나나",
      coin: "$20",
      num: 6,
    },
  ];
  return (
    <div>
      <h4 className="title">Cart</h4>
      <Hello />
      {장바구니.map((item, index) => (
        <CartItem {...item} key={index} />
      ))}
      <Button color="red" />
    </div>
  );
}

function CartItem(item) {
  return (
    <div className="cart-item">
      <p>
        {item.name} {nickname}
      </p>
      <p>{item.coin}</p>
      <p>{item.num}개</p>
    </div>
  );
}

export default Cart;
