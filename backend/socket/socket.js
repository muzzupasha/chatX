import { Server } from "socket.io";

const userSocketMap = {}; // Object to map user IDs to their corresponding socket IDs for real-time communication
let io; // Variable to hold the Socket.IO server instance

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]; // Function to retrieve the socket ID of a specific receiver based on their user ID. This allows the server to send messages directly to the intended recipient in real-time.
export const getIO = () => io; // Function to retrieve the Socket.IO server instance. This allows other parts of the application to access the socket server for emitting events or handling connections.

const initializeSocket = (server) => {
  // Function to initialize the Socket.IO server with the provided HTTP server instance. It sets up the necessary configurations and event listeners for real-time communication.
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Event listener for new socket connections. When a client connects to the server, this callback is executed, allowing the server to handle the connection and set up necessary event listeners for that specific socket.
    console.log("user is connected", socket.id);

    const userId = socket.handshake.query.userId
      ? String(socket.handshake.query.userId).trim()
      : undefined;

    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit an event to all connected clients with the list of currently online users. This allows clients to update their UI with the latest online user information in real-time.

    socket.on("disconnect", () => {
      // Event listener for socket disconnections. When a client disconnects from the server, this callback is executed, allowing the server to clean up any associated data and notify other clients of the change in online users.
      console.log("user disconnected", socket.id);
      if (userId !== undefined && userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export default initializeSocket;
