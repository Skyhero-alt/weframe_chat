### Weframe_Chat

<img src = "https://i.imgur.com/5zAwVAW.png" />

#### Tasks completed:

- Built login UI
- Enabled firebase authentication
- Built a functional Chat UI
- Completed all the chat components
- Implemented the database schema using prisma
- Finished the API routes for the users, conversation and messages
- Integrated all the api's on the client side
- Added contact list
- Added socket.io for RTC

#### Tasks to be completed:

- Add contact button
- Add search

#### Post completion:

- Make the UI look polished and responsive

### Database Schema:

```js
model Users {
  uid    String @id
  name   String
  email  String @unique
  avatar String
}

model Conversations {
  id        String    @id @default(uuid())
  members   String[]
  createdAt DateTime  @default(now())
  Message   Message[]
}

model Message {
  id             String        @id @default(uuid())
  conversation   Conversations @relation(fields: [conversationId], references: [id])
  conversationId String
  sender         String
  text           String
  createdAt      DateTime      @default(now())
}
```

Deployed link: https://weframe-chat.vercel.app/
(For some reason the deployed version has different fonts than the local one)
