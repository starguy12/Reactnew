import { Link } from "react-router-dom";

function Nav() { 
    return (
         <nav>
        <div className="row nav__row">
          <div className="nav__title">Movies</div>
          <div className="nav__links">
            {/* <a href="#" className="nav__link">
              Home
            </a>
            <a href="#" className="nav__link">
              About
            </a>
            <a href="#" className="nav__link">
              Contact
            </a> */}
            <Link to="/" className="nav__link">
              Home
            </Link>
            <Link to="/" className="nav__link">
              About
            </Link>
            <Link to="/" className="nav__link">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    )
}

export default Nav;