import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/Navbar";
import { Home } from "./pages/Home";  

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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
