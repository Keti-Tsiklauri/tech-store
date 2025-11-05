import { useState } from "react";
import "./PriceFilter.css";

export default function PriceFilter({
  onFilter,
  initialMin = "",
  initialMax = "",
}) {
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  const handleFilterClick = () => {
    onFilter({
      min: minPrice ? Number(minPrice) : 0,
      max: maxPrice ? Number(maxPrice) : Infinity,
    });
  };

  const handleClearClick = () => {
    setMinPrice("");
    setMaxPrice("");
    onFilter({ min: 0, max: Infinity }); // reset filter
  };

  return (
    <div className="filter-container">
      <label>
        Min Price:{" "}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>
      <label>
        Max Price:{" "}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>
      <button onClick={handleFilterClick}>Filter</button>
      <button onClick={handleClearClick} className="clear-button">
        Clear
      </button>
    </div>
  );
}
