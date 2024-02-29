import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "52dcc4c0e23e2427ac53",
      clientSecret: "44c4e04becd67cb937463b7402f594b99bcb8218",
    }),
  ],
  secret: "lucyjuyeonmisssim29",
  adaper: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
