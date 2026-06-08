import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "400px",
          margin: "80px auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1>Iniciar Sesión</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
        />

        <input
          type="password"
          placeholder="Contraseña"
        />

        <button>Entrar</button>
      </div>
    </>
  );
}

export default LoginPage;