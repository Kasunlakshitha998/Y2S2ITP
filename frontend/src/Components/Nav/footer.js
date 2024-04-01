import React from 'react'
import './userNav.css'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer>
                <div class="footer-container">
                    <div class="footer-contact">
                        <h3>Tech Connect</h3>
                        <p>No:43, Namaluwa Rd, Dekatana, Sri Lanka</p>
                        <p>+94 757 717 569</p>
                        <p>techconnectstore@gmail.com</p>
                    </div>
                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="#">Home</Link></li>
                            <li><Link to="#">Contact Us</Link></li>
                            <li><Link to="#">Shop</Link></li>
                            <li><Link to="#">FAQs</Link></li>
                            <li><Link to="#">Meet the Team</Link></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link to="#">Categories</Link></li>
                            <li><Link to="#">Shipping & Returns</Link></li>
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">My Account</Link></li>
                            <li><Link to="#">Privacy Policy</Link></li>
                            <li><Link to="#">Careers</Link></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link to="#">Our Story</Link></li>
                            <li><Link to="#">Feedback</Link></li>
                        </ul>
                    </div>
                    <div class="footer-signup">
                        <h4>Subscribe to Our Newsletter</h4>
                        <form action="#">
                            <input type="email" name="email" id="email" placeholder="Enter your email address"/>
                                <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div class="footer-copyright">
                    <p>&copy; 2024 Tech-Connect, All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;