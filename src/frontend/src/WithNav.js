import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./AppBar/NavBar";
import Footer from "./Main/Footer";

export default function WithNav() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
