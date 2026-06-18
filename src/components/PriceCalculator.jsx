import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function QuoteForm({ user }) {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [projectType, setProjectType] = useState("");

  const [hours, setHours] = useState(0);
  const [rate, setRate] = useState(0);

  const [complexity, setComplexity] = useState("");
  const [revisions, setRevisions] = useState(0);
  const [urgency, setUrgency] = useState("");

  const [cost, setCost] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("quotes")
      .insert({
        user_id: user.id,

        client,
        project,
        project_type: projectType,

        hours,
        rate,

        complexity,
        revisions,
        urgency,

        cost,
        subtotal,
        vat_amount: vatAmount,
        total,
        profit,

        status: "Pendiente",
        notes: "",
      });


    if (error) {
      console.error(error);
      alert("Error al guardar en Supabase");
      return;
    }


    alert("Presupuesto guardado correctamente");


    // limpiar formulario
    setClient("");
    setProject("");
    setProjectType("");
  };


  return (
    <form onSubmit={handleSubmit}>


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
          onChange={(e) =>
            setProjectType(e.target.value)
          }
        >
          <option value="">
            Selecciona
          </option>

          <option value="Web">
            Web
          </option>

          <option value="Diseño">
            Diseño
          </option>

          <option value="App">
            App
          </option>

        </select>

      </div>


      <br />


      <div>
        <label>Horas</label>
        <br />

        <input
          type="number"
          value={hours}
          onChange={(e) =>
            setHours(Number(e.target.value))
          }
        />

      </div>


      <br />


      <div>
        <label>Precio/hora</label>
        <br />

        <input
          type="number"
          value={rate}
          onChange={(e) =>
            setRate(Number(e.target.value))
          }
        />

      </div>


      <br />


      <div>
        <label>Complejidad</label>
        <br />

        <input
          type="text"
          value={complexity}
          onChange={(e) =>
            setComplexity(e.target.value)
          }
        />

      </div>


      <br />


      <div>
        <label>Revisiones</label>
        <br />

        <input
          type="number"
          value={revisions}
          onChange={(e) =>
            setRevisions(Number(e.target.value))
          }
        />

      </div>


      <br />


      <div>
        <label>Urgencia</label>
        <br />

        <input
          type="text"
          value={urgency}
          onChange={(e) =>
            setUrgency(e.target.value)
          }
        />

      </div>


      <br />


      <button type="submit">
        Guardar presupuesto
      </button>


    </form>
  );
}