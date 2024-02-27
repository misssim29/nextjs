import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, idx) => (
        <Link href={`/detail/${item._id}`}>
          <div className="list-item" key={idx}>
            <div>
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <DetailLink />
            </div>
            <Link href={`/edit/${item._id}`}>✏️</Link>
          </div>
        </Link>
      ))}
    </div>
  );
}
