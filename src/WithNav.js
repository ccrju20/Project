import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./AppBar/NavBar";

export default function WithNav() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
