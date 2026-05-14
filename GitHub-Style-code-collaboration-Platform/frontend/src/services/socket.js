import { io } from "socket.io-client";

const socket = io(
  "http://localhost:2929",
  {
    withCredentials: true,
  }
);

export default socket;