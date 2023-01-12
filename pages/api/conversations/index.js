// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient({ log: ["query", "info"] });

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      const result = await client.Conversations.create({
        data: {
          members: [req.body.senderId, req.body.receiverId],
        },
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return 0;
  }
}
