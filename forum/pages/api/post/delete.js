import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(response, result) {
  let session = await getServerSession(response, result, authOptions);

  const body = JSON.parse(response.body);

  if (body.auth == session.user.email) {
    if (response.method == "DELETE") {
      try {
        let db = (await connectDB).db("forum");
        let data = await db
          .collection("post")
          .deleteOne({ _id: new ObjectId(body.id) });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
