import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>Valora</h2>

      <div>
        <Link to="/" style={{ marginRight: "20px" }}>
          Inicio
        </Link>

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
