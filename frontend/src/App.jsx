import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { Home } from "./pages/Home";
import {SellerDashBoard} from "../src/pages/SellerDashBoard";
import { Footer } from "./components/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/seller" element={<SellerDashBoard />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
