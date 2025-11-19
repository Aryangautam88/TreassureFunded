import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Add from "./components/Add";
import { Outlet } from "react-router-dom";

const Common = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Add />
      <Footer/>
    </>
  );
};

export default Common;
