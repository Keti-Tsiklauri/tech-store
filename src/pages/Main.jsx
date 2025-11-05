import React from "react";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="main-page-container">
      <header className="main-header">
        <h1>Welcome to TechWorld</h1>
        <p>
          At TechWorld, we’ve been providing high-quality electronics for over a
          decade. From laptops to smartphones and accessories, we bring the best
          technology to our customers.
        </p>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <h2>12+</h2>
          <p>Years in Business</p>
        </div>
        <div className="stat-card">
          <h2>10,000+</h2>
          <p>Products Sold</p>
        </div>
        <div className="stat-card">
          <h2>3</h2>
          <p>Product Categories</p>
        </div>
        <div className="stat-card">
          <h2>500+</h2>
          <p>Happy Customers</p>
        </div>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          TechWorld is a leading retailer of electronic devices. We pride
          ourselves on delivering the latest technology at competitive prices,
          providing excellent customer service, and helping our clients find the
          perfect device for their needs. Whether you’re looking for laptops,
          smartphones, or accessories, we’ve got you covered.
        </p>
      </section>
    </div>
  );
}
