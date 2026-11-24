// components/SocketListener.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../utils/utils.js";
import {
  pushNotificationData,
  setOrderData,
} from "../store/feature/UserData.js";

const SocketListener = () => {
  const dispatch = useDispatch();
  const { user, verified, type } = useSelector((state) => state.userstore);

  useEffect(() => {
    if (!verified || type === "auth" || !user?._id) return;

    socket.io.opts.query = { userId: user._id };
    socket.connect();

    const onOnlineUsers = (data) => console.log(data);

    const onNotification = (data) => {
      console.log("notification received", socket.id, data.notification._id);
      dispatch(pushNotificationData(data.notification));
      dispatch(setOrderData(data.order));
      toast.success(data.notification.text, { toastId: data.notification._id });
    };

    socket.on("notification", onNotification);
    console.log("listeners now:", socket.listeners("notification").length);

    return () => {
      socket.off("getOnlineUsers", onOnlineUsers);
      socket.off("notification", onNotification);
      socket.disconnect();
    };
  }, [verified, type, user?._id, dispatch]);

  return null;
};

export default SocketListener;
