import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ email, loggedIn, onLogout }) {
  return (
    <header className="header page__section">
      <img src={logo} alt="Around the U.S logo" className="logo header__logo" />

      <div className="header__auth">
        {loggedIn ? (
          <>
            <p className="header__email">{email}</p>
            <button onClick={onLogout} className="header__logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="header__link">
              Login
            </Link>

            <Link to="/signup" className="header__link">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
