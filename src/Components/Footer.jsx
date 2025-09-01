import React from "react";
import "./Footer.css";
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">RecipeApp</div>

        <div className="footer-settings">
          <select>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
          <select>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      <div className="footer-links">
        <div>
          <h4>ABOUT RECIPEAPP</h4>
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4>RECIVERSE</h4>
          <ul>
            <li>RecipeApp</li>
            <li>Blinkit</li>
            <li>District</li>
            <li>Feeding India</li>
            <li>Hyperpure</li>
            <li>Zomato Live</li>
            <li>Zomaland</li>
            <li>Weather Union</li>
          </ul>
        </div>

        <div>
          <h4>FOR RESTAURANTS</h4>
          <ul>
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>

        <div>
          <h4>LEARN MORE</h4>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
          </ul>
        </div>

        <div>
          <h4>SOCIAL LINKS</h4>
          <div className="social-icons">
            <FaLinkedin />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
            <FaFacebook />
          </div>
          <div className="app-badges">
            <img src="https://b.zmtcdn.com/data/o2_assets/df6464de32f4a09262cee301f65aaa661739351256.png" alt="App Store" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content
          Policies. All trademarks are properties of their respective owners. 2025 © RecipeApp™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
