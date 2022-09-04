import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route />
    </Routes>
  </HashRouter>
);
