import { hashPassword } from "../../../helpers/auth";
import connectToDB from "../../../helpers/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, username, password } = req.body;

    if (
      !name ||
      !name.trim() ||
      !username ||
      !username.trim() ||
      !email ||
      !email.trim() ||
      !password ||
      !password.trim()
    ) {
      res.status(422).json({ success: false, message: "Invalid User Data" });
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    try {
      const existingUser = await db
        .collection("users")
        .findOne({ email: email });

      if (existingUser) {
        res
          .status(422)
          .json({ success: false, message: "Email Already Registered!" });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const result = await db.collection("users").insertOne({
        name,
        username,
        email,
        password: hashedPassword,
      });

      client.close();

      res
        .status(201)
        .json({ success: true, message: "Registered Successfully!" });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Server Error. Try Again." });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid Request Method" });
  }
};

export default handler;
