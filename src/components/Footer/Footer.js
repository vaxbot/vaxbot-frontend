import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div id="footer">
      <footer>
        <ul className="footer-list">
          <li className="footer-list-item">Copyright &copy; vaxbot 2021</li>
          <li className="footer-list-item">
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
