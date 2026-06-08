import { useNavigate } from "react-router-dom";

function Landingpage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Valora</h1>

      <p>
        Calcula presupuestos profesionales
      </p>

      <button
        onClick={() => navigate("/login")}
      >
        Comenzar
      </button>
    </div>
  );
}

export default Landingpage;