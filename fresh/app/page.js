import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  let name = "park";

  return (
    <div>
      <h4 className="title">안녕</h4>
      <p className="title-sub">by dev {name}</p>
    </div>
  );
}
