import mongoose from "mongoose";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1223516",
  key: "5eb76e1f25ce4b5765ee",
  secret: "9ef49968e734ea5e48af",
  cluster: "ap2",
  useTLS: true,
});

mongoose
  .connect(
    "mongodb+srv://DB_for_whatsapp_clone:MnvbPv6J4jxBGjG@cluster0.akotk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then()
  .catch((err) => console.log(err));

const db = mongoose.connection;

// create a change stream once the database is connnected
db.once("open", () => {
  console.log("Connected to database");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  // watch the change stream for changes
  changeStream.on("change", (change) => {
    // check for 'insert' type of change in the changeStream and then trigger a pusher
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        received: messageDetails.received,
      });
    }
  });
});
