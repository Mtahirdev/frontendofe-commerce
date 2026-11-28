// Hellper function
import { io } from "socket.io-client";

export const socket = io("https://backend-e-commerce-black.vercel.app", {
  autoConnect: false,
});
