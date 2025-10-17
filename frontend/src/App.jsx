
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { Home } from "../src/pages/Home";
import { Footer } from "../src/components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Home />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

