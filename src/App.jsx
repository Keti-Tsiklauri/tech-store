import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Main from "./pages/Main";
import MobilePhones from "./pages/MobilePhones";
import Laptops from "./pages/Laptops";
import Computers from "./pages/Computers";
import Accessories from "./pages/Accessories";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mobile-phones" element={<MobilePhones />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/computers" element={<Computers />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}
