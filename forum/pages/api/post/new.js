import { connectDB } from "@/util/database";

export default async function handler(response, result) {
  console.log(response.body);
  if (response.method == "POST") {
    if (response.body.title == "") {
      return result.status(200).json("제목 왜 안씀");
    }
    if (response.body.content == "") {
      return result.status(200).json("내용 왜 안씀");
    }
    const db = (await connectDB).db("forum");
    let res = await db.collection("post").insertOne(response.body);
    return result.status(200).redirect("/list");
  }
}
