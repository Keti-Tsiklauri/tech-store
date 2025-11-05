import { useState } from "react";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const handleQuantityChange = (id, value) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Number(value) } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemove = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (cart.length === 0)
    return <p style={{ padding: "20px" }}>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.images[0]} alt={item.title} className="cart-image" />
          <div className="cart-details">
            <h3>{item.title}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

            <div className="cart-quantity">
              <label htmlFor={`quantity-${item.id}`}>Qty: </label>
              <select
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h3 className="cart-total">Total: ${totalPrice}</h3>
    </div>
  );
}
