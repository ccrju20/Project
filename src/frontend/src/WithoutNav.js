import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Main/Footer";

export default function WithoutNav() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
