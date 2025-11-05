import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Main from "./pages/Main";
import MobilePhones from "./pages/MobilePhones";
import Laptops from "./pages/Laptops";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mobile-phones" element={<MobilePhones />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
