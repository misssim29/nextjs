import { connectDB } from "@/util/database";

export default async function handler(response, result) {
  if (response.method == "POST") {
    if (
      response.body.id == "" ||
      response.body.password == "" ||
      response.body.name == ""
    ) {
      return result.status(200).json("정보를 입력해주세요");
    } else {
      const db = (await connectDB).db("forum");
      let res = await db.collection("user").insertOne(response.body);
      return result.status(200).redirect("/");
    }
  }
}
