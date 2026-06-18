import { useEffect, useState } from "react";
import { supabase } from "./../lib/supabase";


export default function QuoteForm() {


  const [user, setUser] = useState(null);


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



  // 1. Obtener usuario actual

  useEffect(() => {


    const getUser = async () => {


      const {
        data: { user }

      } = await supabase.auth.getUser();



      setUser(user);


    };


    getUser();


  }, []);





  // 2. Guardar presupuesto


  const handleSave = async (e) => {


    e.preventDefault();



    if (!user) {

      alert("No hay usuario conectado");

      return;

    }




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


        status:"Pendiente",

        notes:""


      });





    if(error){

      console.error(error);

      alert("Error guardando presupuesto");

      return;

    }




    alert("Presupuesto guardado correctamente");



    setClient("");
    setProject("");
    setProjectType("");



  };







  return (

    <form onSubmit={handleSave}>


      <h2>
        Nuevo presupuesto
      </h2>




      <label>
        Cliente
      </label>

      <br />

      <input

        value={client}

        onChange={(e)=>
          setClient(e.target.value)
        }

      />



      <br/><br/>





      <label>
        Proyecto
      </label>

      <br />

      <input

        value={project}

        onChange={(e)=>
          setProject(e.target.value)
        }

      />




      <br/><br/>





      <label>
        Tipo de proyecto
      </label>

      <br/>


      <select

        value={projectType}

        onChange={(e)=>
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





      <br/><br/>





      <label>
        Horas
      </label>

      <br/>


      <input

        type="number"

        value={hours}

        onChange={(e)=>
          setHours(Number(e.target.value))
        }

      />






      <br/><br/>





      <label>
        Precio hora
      </label>


      <br/>


      <input

        type="number"

        value={rate}

        onChange={(e)=>
          setRate(Number(e.target.value))
        }

      />






      <br/><br/>




      <label>
        Complejidad
      </label>


      <br/>


      <input

        value={complexity}

        onChange={(e)=>
          setComplexity(e.target.value)
        }

      />






      <br/><br/>





      <label>
        Revisiones
      </label>


      <br/>


      <input

        type="number"

        value={revisions}

        onChange={(e)=>
          setRevisions(Number(e.target.value))
        }

      />







      <br/><br/>






      <label>
        Urgencia
      </label>


      <br/>


      <input

        value={urgency}

        onChange={(e)=>
          setUrgency(e.target.value)
        }

      />







      <br/><br/>






      <button type="submit">

        Guardar presupuesto

      </button>





    </form>

  );


}