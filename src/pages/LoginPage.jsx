import { supabase } from "../lib/supabase";

function LoginPage() {
  const handleGoogleLogin = async () => {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

    if (error) {
      console.error(
        "Error:",
        error.message
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "20px",
        background: "#080808",
        color: "white",
      }}
    >
      <img
        src="/logo.png"
        alt="Valora"
        style={{
          width: "180px",
        }}
      />

      <h1
        style={{
          fontSize: "32px",
          margin: 0,
        }}
      >
        Valora
      </h1>

      <p
        style={{
          color: "#9ca3af",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        Calcula, gestiona y envía
        presupuestos profesionales.
      </p>

      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          border: "none",
          background: "#ffffff",
          color: "#000000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Continuar con Google
      </button>
    </div>
  );
}

export default LoginPage;