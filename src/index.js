import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import { Forum } from "./Forum";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<SignIn />} />
      <Route exact path="Forum" element={<Forum />} />
      <Route />
    </Routes>
  </HashRouter>
);
