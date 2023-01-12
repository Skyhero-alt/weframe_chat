import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({ log: ["query", "info"] });

export default async function hadler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;
    try {
      const result = await client.Message.findMany({
        where: {
          conversationId: id,
        },
        select: {
          id: true,
          sender: true,
          text: true,
          createdAt: true,
        },
      });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  }
}
