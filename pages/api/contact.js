import connectToDB from "../../helpers/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !name ||
      !name.trim() ||
      !email ||
      !email.trim() ||
      !message ||
      !message.trim()
    ) {
      res.status(422).json({ success: false, message: "Invalid Data" });
      return false;
    }

    const client = await connectToDB();

    const db = client.db();

    try {
      const result = await db.collection("contact").insertOne({
        name,
        email,
        message,
      });

      client.close();

      res
        .status(201)
        .json({ success: true, message: "Message Sent Successfully!" });
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Server Error. Try Again." });
    }
  } else {
    res.status(405).json({ success: false, message: "Invalid Method" });
  }
};

export default handler;
