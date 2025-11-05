import { useState, useEffect } from "react";
import PriceFilter from "../components/PriceFilter";
import "./Products.css";

export default function Products({ category, title }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=100`
        );
        if (!res.ok) throw new Error(`Failed to fetch ${title}`);
        const data = await res.json();
        const validProducts = data.products.filter(
          (item) => item.title && item.price && item.images?.length
        );
        setProducts(validProducts);
        setFilteredProducts(validProducts);

        const initialQuantities = {};
        validProducts.forEach((p) => {
          initialQuantities[p.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, title]);

  const handleBuy = (product) => {
    const quantity = quantities[product.id] || 1;
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...product, quantity }];
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
    const filtered = products.filter((p) => p.price >= min && p.price <= max);
    setFilteredProducts(filtered);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading {title}...</p>;
  if (error)
    return (
      <p style={{ padding: "20px", color: "red" }}>
        Error loading {title}: {error}
      </p>
    );

  return (
    <div>
      <h2 style={{ margin: "20px 0", color: "#4b0082" }}>{title}</h2>
      <PriceFilter onFilter={handlePriceFilter} />

      <div className="product-container">
        {filteredProducts.length === 0 ? (
          <p style={{ padding: "20px", color: "#9b59b6", fontWeight: "500" }}>
            No products found for this price range.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {getQuantity(product.id) > 0 && (
                <span className="bought-badge">
                  Bought x{getQuantity(product.id)}
                </span>
              )}
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>

              <div className="quantity-container">
                <label htmlFor={`quantity-${product.id}`}>Qty: </label>
                <select
                  id={`quantity-${product.id}`}
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={() => handleBuy(product)} className="buy-button">
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
