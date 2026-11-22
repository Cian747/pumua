
import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <header className="public-header">
        <Link to="/" className="brand">
          <span className="brand-icon">◉</span>
          <span>
            BREATH
            <small>CONNECTION</small>
          </span>
        </Link>

        <span className="header-caption">
          Breathe Better. Live Better.
        </span>
      </header>

      <Outlet />
    </div>
  );
}
