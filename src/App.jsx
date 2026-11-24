import "./App.css";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SocketListener from "./hooks/SocketListner.jsx";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
