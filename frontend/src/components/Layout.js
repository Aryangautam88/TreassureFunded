import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    // Set active based on current path
    if (location.pathname.includes("headadmin")) {
      setActive("HeadAdmin");
    } else if (location.pathname.includes("dashboard")) {
      setActive("Dashboard");
    }
    // add more conditions as needed
  }, [location]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={active} setActive={setActive} />
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
