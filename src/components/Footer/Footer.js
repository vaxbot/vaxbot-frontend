import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <li className="footer-list-item">
            <a className="github" target="_blank" rel="noopener noreferrer" href="https://github.com/vaxbot">
              <FontAwesomeIcon id="github-icon" icon={["fab", "github"]}/>
              <span>Github</span>
            </a>
          </li>
          <li className="footer-list-item">
            <FontAwesomeIcon id="email-icon" icon={["fa", "envelope"]}/>
            <span>vaxbotstl@gmail.com</span>
          </li>
          <li className="image-source-link">
            <a target="_blank" href="https://icons8.com/icons/set/broken-robot">Broken Robot icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
