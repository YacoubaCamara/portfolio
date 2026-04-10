import { NavLink } from "react-router-dom";

function Navbar() {
  const hasAccess = import.meta.env.VITE_SHOW_MESSAGES === "true";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar shadow-sm">
      <div className="layout-container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Yacouba&apos;s Portfolio
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects">Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>

            {hasAccess && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/messages">
                  Messages
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;