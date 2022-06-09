import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import StockManagement from "./pages/StockManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<StockManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
