import { PrismaClient } from "@prisma/client";

const client = new PrismaClient({ log: ["query", "info"] });

export default async function handler(req, res) {
  if (req.method == "POST") {
    const exist = await client.Users.findFirst({
      where: {
        uid: req.body.uid,
      },
      select: {
        uid: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!exist) {
      try {
        const result = await client.Users.create({
          data: {
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
          },
        });
        console.log(result);
        res.json({ message: "new user" });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log({ message: "Wrong req method" });
    }
  }
}
