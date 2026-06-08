import { useState, useEffect } from "react";
import PriceCalculator from "../components/PriceCalculator";
import PDFGenerator from "../components/PDFGenerator";
import { Link } from "react-router-dom";

function Dashboard() {}
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("quotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "quotes",
      JSON.stringify(quotes)
    );
  }, [quotes]);

  const acceptedQuotes = quotes.filter(
    (quote) => quote.status === "Aceptado"
  ).length;

  const pendingQuotes = quotes.filter(
    (quote) => quote.status === "Pendiente"
  ).length;

  const rejectedQuotes = quotes.filter(
    (quote) => quote.status === "Rechazado"
  ).length;

  const totalRevenue = quotes.reduce(
    (sum, quote) =>
      sum + Number(quote.total || 0),
    0
  );

  return (
  <div style={{ padding: "30px" }}>
      <h1>Dashboard Valora</h1>

      <Link to="/settings">
        <button>
          Configuración Empresa
        </button>
      </Link>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <strong>Facturación:</strong>
          <br />
          {totalRevenue.toFixed(2)} €
        </div>

        <div>
          <strong>Aceptados:</strong>
          <br />
          {acceptedQuotes}
        </div>

        <div>
          <strong>Pendientes:</strong>
          <br />
          {pendingQuotes}
        </div>

        <div>
          <strong>Rechazados:</strong>
          <br />
          {rejectedQuotes}
        </div>
      </div>

      <PriceCalculator
        onSave={(quote) =>
          setQuotes((prev) => [...prev, quote])
        }
      />

      <hr />

      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <h2>Historial</h2>

  <h2>Top Clientes</h2>

{Object.entries(
  quotes.reduce((acc, quote) => {
    acc[quote.client] =
      (acc[quote.client] || 0) +
      Number(quote.total);

    return acc;
  }, {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([client, total]) => (
    <p key={client}>
      {client}: {total.toFixed(2)} €
    </p>
  ))}

<h2>Favoritos</h2>

{quotes
  .filter((quote) => quote.favorite)
  .map((quote) => (
    <div
      key={quote.id}
      style={{
        border: "2px solid gold",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <strong>{quote.client}</strong>
      <p>{quote.project}</p>
      <p>{quote.total} €</p>
    </div>
  ))}

<h2>Historial</h2>

{quotes
  .filter(
    (quote) =>
      quote.client
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      quote.project
        ?.toLowerCase()
        .includes(search.toLowerCase())
  )
  .map((quote, index) => (
    <div
      key={quote.id}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <p>
        <strong>
          PRES-{String(quote.id).slice(-6)}
        </strong>
      </p>

      <p>
        Cliente: {quote.client}
      </p>

      <p>
        Proyecto: {quote.project}
      </p>

      <p>
        Total: {quote.total} €
      </p>

      <p>
        Estado:
        {" "}
        {quote.status === "Aceptado" ? (
          <span
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            🟢 Aceptado
          </span>
        ) : quote.status ===
          "Rechazado" ? (
          <span
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            🔴 Rechazado
          </span>
        ) : (
          <span
            style={{
              color: "orange",
              fontWeight: "bold",
            }}
          >
            🟡 Pendiente
          </span>
        )}
      </p>

      {quote.notes && (
        <p>
          <strong>Nota:</strong>{" "}
          {quote.notes}
        </p>
      )}

      <PDFGenerator quote={quote} />

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => {
          const updatedQuotes = [...quotes];

updatedQuotes[index] = {
  ...quote,
  status: "Aceptado",
};

            setQuotes(updatedQuotes);
          }}
        >
          Aceptado
        </button>

        <button
          onClick={() => {
            const updatedQuotes = [
              ...quotes,
            ];

            updatedQuotes[index] = {
              ...quote,
              status: "Rechazado",
            };

            setQuotes(updatedQuotes);
          }}
        >
          Rechazado
        </button>

        <button
          onClick={() => {
            const newNote = prompt(
              "Nota interna",
              quote.notes || ""
            );

            const updatedQuotes = [
              ...quotes,
            ];

            updatedQuotes[index] = {
              ...quote,
              notes: newNote,
            };

            setQuotes(updatedQuotes);
          }}
        >
          Nota
        </button>

        <button
          onClick={() => {
            const updatedQuotes = [
              ...quotes,
            ];

            updatedQuotes[index] = {
              ...quote,
              favorite:
                !quote.favorite,
            };

            setQuotes(updatedQuotes);
          }}
        >
          {quote.favorite
            ? "⭐"
            : "☆"}
        </button>

               <button
          onClick={() =>
            setQuotes(
              quotes.filter(
                (_, i) => i !== index
              )
            )
          }
        >
          Eliminar
        </button>
      </div>
    </div>
  ))}

    </div>
  );


export default Dashboard;