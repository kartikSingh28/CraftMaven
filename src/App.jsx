import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
