import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import BasicCard from "./BasicCard";
import CreateTopic from "./CreateTopic";
import EditTopic from "./EditTopic";
import DelTopic from "./DelTopic";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<BasicCard />} />
      <Route exact path="BasicCard" element={<BasicCard />} />
      <Route exact path="/BasicCard/:props" element={<BasicCard />} />
      <Route exact path="SignIn" element={<SignIn />} />
      <Route exact path="CreateTopic" element={<CreateTopic />} />
      <Route exact path="EditTopic" element={<EditTopic />} />
      <Route exact path="EditTopic/:id" element={<EditTopic />} />
      <Route exact path="DelTopic/:id" element={<DelTopic />} />
      <Route />
    </Routes>
  </HashRouter>
);
