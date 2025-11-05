import { useState, useEffect } from "react";
import PriceFilter from "../components/PriceFilter";
import "./Computers.css";

export default function Computers() {
  const [computers, setComputers] = useState([]);
  const [filteredComputers, setFilteredComputers] = useState([]);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products/category/laptops?limit=100"
        );
        if (!res.ok) throw new Error("Failed to fetch computers");
        const data = await res.json();
        const validComputers = data.products.filter(
          (item) => item.title && item.price && item.images?.length
        );
        setComputers(validComputers);
        setFilteredComputers(validComputers);

        const initialQuantities = {};
        validComputers.forEach((c) => {
          initialQuantities[c.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, []);

  const handleBuy = (computer) => {
    const quantity = quantities[computer.id] || 1;
    const existingItem = cart.find((item) => item.id === computer.id);

    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === computer.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...computer, quantity }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const getQuantity = (id) => {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handlePriceFilter = ({ min, max }) => {
    const filtered = computers.filter((c) => c.price >= min && c.price <= max);
    setFilteredComputers(filtered);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
    <div>
      <PriceFilter onFilter={handlePriceFilter} />

      <div className="computers-container">
        {filteredComputers.length === 0 ? (
          <p style={{ padding: "20px", color: "#9b59b6", fontWeight: "500" }}>
            No products found for this price range.
          </p>
        ) : (
          filteredComputers.map((computer) => (
            <div key={computer.id} className="computer-card">
              {getQuantity(computer.id) > 0 && (
                <span className="bought-badge">
                  Bought x{getQuantity(computer.id)}
                </span>
              )}
              <img
                src={computer.images[0]}
                alt={computer.title}
                className="computer-image"
              />
              <h3 className="computer-title">{computer.title}</h3>
              <p className="computer-price">${computer.price}</p>

              <div className="quantity-container">
                <label htmlFor={`quantity-${computer.id}`}>Qty: </label>
                <select
                  id={`quantity-${computer.id}`}
                  value={quantities[computer.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(computer.id, e.target.value)
                  }
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleBuy(computer)}
                className="buy-button"
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
