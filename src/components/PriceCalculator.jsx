import { useState } from "react";

function PriceCalculator({ onSave }) {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");

  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(30);

  const [complexity, setComplexity] = useState(1);
  const [revisions, setRevisions] = useState(0);
  const [urgency, setUrgency] = useState(1);
  const [vat, setVat] = useState(21);

  const [projectType, setProjectType] =
    useState("Landing Page");

  const subtotal =
    hours * rate * complexity * urgency +
    revisions * 25;

  const vatAmount =
    subtotal * (vat / 100);

  const total =
    subtotal + vatAmount;

  const saveQuote = () => {
    if (!client.trim()) {
      alert("Introduce un cliente");
      return;
    }

    if (!project.trim()) {
      alert("Introduce un proyecto");
      return;
    }

    onSave({
      id: Date.now(),

      favorite: false,
      status: "Pendiente",
notes: "",
favorite: false,
      client,
      project,
      projectType,

      hours,
      rate,

      complexity,
      revisions,
      urgency,

      vat,

      subtotal:
        subtotal.toFixed(2),

      vatAmount:
        vatAmount.toFixed(2),

      total:
        total.toFixed(2),

      date:
        new Date().toLocaleDateString(),
    });

    setClient("");
    setProject("");
  };

  return (
    <div>
      <h2>
        Calculadora de Presupuestos
      </h2>

      <div>
        <label>Cliente</label>
        <br />

        <input
          type="text"
          value={client}
          onChange={(e) =>
            setClient(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>Proyecto</label>
        <br />

        <input
          type="text"
          value={project}
          onChange={(e) =>
            setProject(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>
          Tipo de Proyecto
        </label>

        <br />

        <select
          value={projectType}
          onChange={(e) => {
            const type =
              e.target.value;

            setProjectType(type);

            if (
              type ===
              "Landing Page"
            )
              setHours(15);

            if (
              type ===
              "Web Corporativa"
            )
              setHours(40);

            if (
              type ===
              "Ecommerce"
            )
              setHours(80);

            if (
              type ===
              "App Móvil"
            )
              setHours(120);

            if (
              type ===
              "SaaS"
            )
              setHours(200);
          }}
        >
          <option>
            Landing Page
          </option>

          <option>
            Web Corporativa
          </option>

          <option>
            Ecommerce
          </option>

          <option>
            App Móvil
          </option>

          <option>
            SaaS
          </option>
        </select>
      </div>

      <br />

      <div>
        <label>
          Horas estimadas
        </label>

        <br />

        <input
          type="number"
          value={hours}
          onChange={(e) =>
            setHours(
              Number(
                e.target.value
              )
            )
          }
        />
      </div>

      <br />

      <div>
        <label>
          Tarifa por hora (€)
        </label>

        <br />

        <input
          type="number"
          value={rate}
          onChange={(e) =>
            setRate(
              Number(
                e.target.value
              )
            )
          }
        />
      </div>

      <br />

      <div>
        <label>
          Complejidad
        </label>

        <br />

        <select
          value={complexity}
          onChange={(e) =>
            setComplexity(
              Number(
                e.target.value
              )
            )
          }
        >
          <option value={1}>
            Baja
          </option>

          <option value={1.25}>
            Media
          </option>

          <option value={1.5}>
            Alta
          </option>
        </select>
      </div>

      <br />

      <div>
        <label>
          Revisiones extra
        </label>

        <br />

        <input
          type="number"
          value={revisions}
          onChange={(e) =>
            setRevisions(
              Number(
                e.target.value
              )
            )
          }
        />
      </div>

      <br />

      <div>
        <label>
          Urgencia
        </label>

        <br />

        <select
          value={urgency}
          onChange={(e) =>
            setUrgency(
              Number(
                e.target.value
              )
            )
          }
        >
          <option value={1}>
            Normal
          </option>

          <option value={1.25}>
            Rápido
          </option>

          <option value={1.5}>
            Urgente
          </option>
        </select>
      </div>

      <br />

      <div>
        <label>IVA (%)</label>

        <br />

        <input
          type="number"
          value={vat}
          onChange={(e) =>
            setVat(
              Number(
                e.target.value
              )
            )
          }
        />
      </div>

      <br />

      <h3>
        Subtotal:
        {" "}
        {subtotal.toFixed(2)} €
      </h3>

      <h3>
        IVA:
        {" "}
        {vatAmount.toFixed(2)} €
      </h3>

      <h2>
        Total:
        {" "}
        {total.toFixed(2)} €
      </h2>

      <br />

      <button
        onClick={saveQuote}
      >
        Guardar presupuesto
      </button>
    </div>
  );
}

export default PriceCalculator;