import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({ log: ["query", "info"] });

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const result = await client.Conversations.findMany({
        where: {
          members: {
            has: id,
          },
        },
        select: {
          id: true,
          Message: true,
        },
      });
      console.log(result);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    return 0;
  }
}
