import { useState, useEffect } from "react";
import "./Review.css";

export default function Review() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved
      ? JSON.parse(saved)
      : [
          {
            name: "Alice",
            text: "Great service and fast delivery!",
            date: "2025-11-05",
          },
          {
            name: "Bob",
            text: "Good quality products, will buy again.",
            date: "2025-11-04",
          },
          {
            name: "Charlie",
            text: "Friendly staff and helpful support.",
            date: "2025-11-03",
          },
        ];
  });

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleAddReview = () => {
    if (!name.trim() || !text.trim()) {
      setError("Please fill in both name and review!");
      return;
    }

    const newReview = {
      name: name.trim(),
      text: text.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setText("");
    setError("");
  };

  return (
    <div className="review-container">
      <h2>Customer Reviews</h2>

      <div className="review-form">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Review"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={handleAddReview}>Add Review</button>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <strong>{review.name}</strong>
              <span className="review-date">{review.date}</span>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
