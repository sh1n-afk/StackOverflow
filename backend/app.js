import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"
import { frontendIP, frontendPort, url } from "./config/serverConfig.js";

const app = express();


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: url }});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("message", async (data) => {
    console.log(data);
    const newMessage = { 
      // text: data,
      // createdAt: Date.now(), 
      // sender: data.sender,
    };
    // await conversationsModel.updateOne(
    //   { id: mongoose.Types.ObjectId(data.id) },
    //   { $push: { message: newMessage } }
    // );
    io.emit("notify", data);

  });


  socket.on("load", async (data) => {
    // Create a message.
    // const result = await conversationsModel.findOne({ _id: mongoose.Types.ObjectId(data.messageid),});
    // // Notify all other users about a new message. 
    // socket.emit("notify", result.message);
    });
    
});
// app.use(
//   cors({ origin: `http://${frontendIP}:${frontendPort}`, credentials: true })
// );

var corsOptions = {
  origin: `http://${frontendIP}:${frontendPort}`,
  // origin: `http://${frontendIP}`,
  "Access-Control-Allow-Origin": "*",
  credentials: "true",
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb'}));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hi from Stackoverflow!");
});

server.listen(3001, () => {
  console.log('server up and running on port 3001')
})

export default app;
