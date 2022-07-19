import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterGroup = () => (
  <div className="footer-container">
    <div className="icons-container">
      <button className="icon-button" type="button">
        <FaGoogle className="icon" />
      </button>
      <button className="icon-button" type="button">
        <FaTwitter className="icon" />
      </button>
      <button className="icon-button" type="button">
        <FaInstagram className="icon" />
      </button>
      <button className="icon-button" type="button">
        <FaYoutube className="icon" />
      </button>
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default FooterGroup
