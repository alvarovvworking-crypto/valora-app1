import { useState } from "react";

function PriceCalculator({ onSave }) {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");

  const [projectType, setProjectType] =
    useState("Landing Page");

  const [hours, setHours] = useState(15);

  const [rate, setRate] = useState(30);

  const [complexity, setComplexity] =
    useState(1);

  const [urgency, setUrgency] =
    useState(1);

  const [revisions, setRevisions] =
    useState(0);

  const [cost, setCost] =
    useState(0);

  const vat = 21;

  const subtotal =
    hours * rate * complexity * urgency +
    revisions * 25;

  const vatAmount =
    subtotal * (vat / 100);

  const total =
    subtotal + vatAmount;

  const profit =
    subtotal - cost;

  const handleSave = () => {
    if (!client.trim()) {
      alert("Introduce un cliente");
      return;
    }

    if (!project.trim()) {
      alert("Introduce un proyecto");
      return;
    }

    onSave({
      client,
      project,
      projectType,
      hours,
      rate,
      complexity,
      urgency,
      revisions,
      cost,
      subtotal,
      vatAmount,
      total,
      profit,
    });

    setClient("");
    setProject("");
  };

  return (
    <div>
      <h2>Nuevo Presupuesto</h2>

      <input
        placeholder="Cliente"
        value={client}
        onChange={(e) =>
          setClient(e.target.value)
        }
      />

      <br />
      <br />

      <input
        placeholder="Proyecto"
        value={project}
        onChange={(e) =>
          setProject(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={projectType}
        onChange={(e) => {
          const type = e.target.value;

          setProjectType(type);

          if (type === "Landing Page")
            setHours(15);

          if (type === "Web Corporativa")
            setHours(40);

          if (type === "Ecommerce")
            setHours(80);

          if (type === "App Móvil")
            setHours(120);

          if (type === "SaaS")
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

      <br />
      <br />

      <label>Horas</label>

      <br />

      <input
        type="number"
        value={hours}
        onChange={(e) =>
          setHours(Number(e.target.value))
        }
      />

      <br />
      <br />

      <label>Tarifa €/hora</label>

      <br />

      <input
        type="number"
        value={rate}
        onChange={(e) =>
          setRate(Number(e.target.value))
        }
      />

      <br />
      <br />

      <label>Complejidad</label>

      <br />

      <select
        value={complexity}
        onChange={(e) =>
          setComplexity(
            Number(e.target.value)
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

      <br />
      <br />

      <label>Urgencia</label>

      <br />

      <select
        value={urgency}
        onChange={(e) =>
          setUrgency(
            Number(e.target.value)
          )
        }
      >
        <option value={1}>
          Normal
        </option>

        <option value={1.25}>
          Rápida
        </option>

        <option value={1.5}>
          Urgente
        </option>
      </select>

      <br />
      <br />

      <label>Revisiones</label>

      <br />

      <input
        type="number"
        value={revisions}
        onChange={(e) =>
          setRevisions(
            Number(e.target.value)
          )
        }
      />

      <br />
      <br />

      <label>Coste interno</label>

      <br />

      <input
        type="number"
        value={cost}
        onChange={(e) =>
          setCost(
            Number(e.target.value)
          )
        }
      />

      <hr />

      <h3>
        Subtotal: {subtotal.toFixed(2)} €
      </h3>

      <h3>
        IVA: {vatAmount.toFixed(2)} €
      </h3>

      <h2>
        Total: {total.toFixed(2)} €
      </h2>

      <h3>
        Beneficio: {profit.toFixed(2)} €
      </h3>

      <button onClick={handleSave}>
        Guardar Presupuesto
      </button>
    </div>
  );
}

export default PriceCalculator;