import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Home;
