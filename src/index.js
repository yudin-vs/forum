import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import BasicCard from "./BasicCard";
import CreateTopic from "./CreateTopic";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<BasicCard />} />
      <Route exact path="/BasicCard" element={<BasicCard />} />
      <Route exact path="/BasicCard/:props" element={<BasicCard />} />
      <Route exact path="/SignIn" element={<SignIn />} />
      <Route exact path="/CreateTopic" element={<CreateTopic />} />
      <Route />
    </Routes>
  </HashRouter>
);
