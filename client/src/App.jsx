import React, { useContext } from "react";
import Home from "./pages/home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import { Route, Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";

import { ToastContainer } from 'react-toastify';

// functional react component

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-slate-400">
      <Navbar />
      <ToastContainer position="bottom-right"/>
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
