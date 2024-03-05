import React from "react";

import { BrowserRouter } from "react-router-dom";

import Router from "./components/Router";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}
