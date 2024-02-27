import { connectDB } from "@/util/database";

export default async function handler(response, result) {
  if (response.method == "POST") {
    return result.status(200).json("처리완료");
  }
  if (response.method == "GET") {
    const db = (await connectDB).db("forum");
    let res = await db.collection("post").find().toArray();
    return result.status(200).json(res);
  }
}
