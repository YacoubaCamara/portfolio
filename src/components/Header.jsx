import { NavLink } from "react-router-dom";

function Header() {
  const hasMessagesAccess = Boolean(import.meta.env.VITE_ADMIN_KEY);

  const navItems = [
    { to: "/", label: "Home", number: "01" },
    { to: "/about", label: "About", number: "02" },
    { to: "/projects", label: "Projects", number: "03" },
    { to: "/contact", label: "Contact", number: "04" },
    ...(hasMessagesAccess
      ? [{ to: "/messages", label: "Messages", number: "05" }]
      : []),
  ];

  return (
    <nav className="navbar navbar-expand-lg custom-header">
      <div className="layout-container custom-header-wrap">
        <NavLink className="custom-header-brand" to="/">
          Yacouba&apos;s Portfolio
        </NavLink>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNav"
          aria-controls="headerNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse custom-header-collapse"
          id="headerNav"
        >
          <div className="custom-nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "custom-nav-link active" : "custom-nav-link"
                }
              >
                <span className="custom-nav-number">{item.number} :</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;