import { Link, Outlet } from "react-router-dom";
import Navbar from "../views/komponen/navbar";
import { Toaster } from "react-hot-toast";

export default function DefaultLayout() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #ffffff",
            padding: "12px",
            color: "#ffffff",
            zIndex: "1000",
            backgroundColor: "#429eff",
          },
          iconTheme: {
            primary: "#ffffff",
            secondary: "#429eff",
          },
        }}
      />
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}
