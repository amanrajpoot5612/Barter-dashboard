import React from "react";
import Sidebar from "./components/Sidebar";
import NavbarAdmin from "./components/NavbarAdmin";

const App = () => {
  return (
    <div className="app-component">
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <NavbarAdmin></NavbarAdmin>
      <Sidebar></Sidebar>
    </div>
  );
};

export default App;
