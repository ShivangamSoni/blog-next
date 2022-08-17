import { getToken } from "next-auth/jwt";

import connectToDB from "../../helpers/db";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await connectToDB();
    const token = await getToken({ req });

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({
      email: token.email,
    });

    if (!user) {
      client.close();
      res.status(401).json({ success: false, message: "User Doesn't Exist" });
      return;
    }

    const userData = {
      name: user.name,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ success: true, data: userData });
    client.close();
  }
};

export default handler;
