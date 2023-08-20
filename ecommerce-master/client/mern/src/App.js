import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilRoot } from "recoil";
import Todolist from "./components/Todolist";
import New from "./components/New";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,Routes,Route
 } from 'react-router-dom'
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Shop from "./components/Shop/Shop";
import Admin from "./components/Admin/Admin";
function App() {
  
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"    element={<Home/>} />
          <Route path="/signin"    element={<Login/>} />
          <Route path="/signup"    element={<Signup/>} />
          <Route path="/shop"    element={<Shop/>} />
          <Route path="/admin"    element={<Admin/>} />
          
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;
