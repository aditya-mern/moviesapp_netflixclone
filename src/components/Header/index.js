import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <div className="container">
    <div className="sub-container">
      <Link to="/" className="nav-link">
        <img
          className="website-image"
          src="https://res.cloudinary.com/aditya-mern/image/upload/v1657113693/Group_7399logo_mrgfvg.png"
          alt="website logo"
        />
      </Link>
      <Link to="/" className="nav-link">
        <p className="para">Home</p>
      </Link>
      <Link to="/popular" className="nav-link">
        <p className="para">Popular</p>
      </Link>
    </div>
    <div className="sub-container">
      <Link to="/search" className="nav-link">
        <button className="search-button" testid="searchButton" type="button">
          <HiOutlineSearch className="search-icon" />
        </button>
      </Link>
      <Link to="/account" className="nav-link">
        <img
          className="profile-image"
          src="https://res.cloudinary.com/aditya-mern/image/upload/v1657131501/Avataravtar_lyhvlq.png"
          alt="profile"
        />
      </Link>
    </div>
  </div>
)
export default Header
