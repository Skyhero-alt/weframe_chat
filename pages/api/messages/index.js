import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({ log: ["query", "info"] });

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const result = await client.Message.create({
        data: req.body,
      });
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Wrong req method");
  }
}
