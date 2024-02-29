import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(response, result) {
  let session = await getServerSession(response, result, authOptions);

  if (session) {
    response.body.author = session.user.email;
  }

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
