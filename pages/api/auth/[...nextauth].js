import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import connectToDB from "../../../helpers/db";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2, // Expires in 2 Hours,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDB();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("Email not Registered");
        }

        if (!(await verifyPassword(credentials.password, user.password))) {
          client.close();
          throw new Error("Invalid Password");
        }

        client.close();
        return { username: user.username, email: user.email };
      },
    }),
  ],
});
