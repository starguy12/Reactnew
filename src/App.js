import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
      </Routes>
      <footer>
        <div className="container">
          <div className="row row__column">
            <div className="footer__list"></div>
            <a href="/" className="footer__link">
              Home
            </a>
            <a href="/" className="footer__link">
              Find your movie
            </a>
            <a href="/contact" className="footer__link">
              Contact
            </a>
          </div>
          <div className="footer__copyright">
            © 2026 Blinker.com.au. All rights reserved.
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;

//we can also create a footer file (Footer.jsx) and place it under components, the same way we did with NAV (Nav.jsx).
//import Footer from "./components/Footer"; -->
