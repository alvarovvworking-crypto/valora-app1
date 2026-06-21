import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import PDFGenerator from "../components/PDFGenerator";


function Dashboard() {


  const [user,setUser] = useState(null);

  const [quotes,setQuotes] = useState([]);

  const [search,setSearch] = useState("");


  const [client,setClient] = useState("");

  const [project,setProject] = useState("");


  const [hours,setHours] = useState(15);

  const [rate,setRate] = useState(30);


  const [complexity,setComplexity] = useState(1);

  const [urgency,setUrgency] = useState(1);


  const [revisions,setRevisions] = useState(0);

  const [cost,setCost] = useState(0);



  useEffect(()=>{

    getUser();

  },[]);



  const getUser = async()=>{


    const {
      data:{user}

    } = await supabase.auth.getUser();



    if(!user){

      return;

    }


    setUser(user);


    loadQuotes(user.id);


  };





  const loadQuotes = async(id)=>{


    const {data,error}=await supabase

    .from("quotes")

    .select("*")

    .eq("user_id",id)

    .order(
      "created_at",
      {
        ascending:false
      }
    );



    if(error){

      console.log(error);

      return;

    }


    setQuotes(data || []);


  };






  const subtotal =

    hours *

    rate *

    complexity *

    urgency +

    revisions * 25;




  const vatAmount = subtotal * 0.21;


  const total = subtotal + vatAmount;


  const profit = subtotal - cost;







  const saveQuote = async()=>{


    if(!user){

      alert("No hay usuario");

      return;

    }




    const {data,error}=await supabase

    .from("quotes")

    .insert({


      user_id:user.id,


      client,

      project,


      hours,

      rate,


      complexity,

      urgency,


      revisions,


      cost,


      subtotal,


      vat_amount:vatAmount,


      total,


      profit,


      status:"Pendiente",


      notes:"",


      favorite:false



    })


    .select()

    .single();




    if(error){

      console.log(error);

      alert(error.message);

      return;

    }



    setQuotes([data,...quotes]);



    setClient("");

    setProject("");


    alert("Guardado");


  };








  const updateQuote = async(id,changes)=>{


    const {error}=await supabase

    .from("quotes")

    .update(changes)

    .eq("id",id);



    if(error){

      console.log(error);

      return;

    }



    setQuotes(prev=>

      prev.map(q=>

        q.id===id

        ?

        {

          ...q,

          ...changes

        }

        :

        q

      )

    );


  };








  const deleteQuote = async(id)=>{


    await supabase

    .from("quotes")

    .delete()

    .eq("id",id);



    setQuotes(prev=>

      prev.filter(q=>q.id!==id)

    );


  };







  const logout = async()=>{


    await supabase.auth.signOut();


    window.location.reload();


  };







  const revenue = quotes.reduce(

    (a,b)=>

      a + Number(b.total || 0),

      0

  );





  return (


<div style={{
padding:"30px"
}}>



<h1>
VALORA Dashboard
</h1>



<button onClick={logout}>
Cerrar sesión
</button>



<hr />



<h2>
Nuevo presupuesto
</h2>



<input

placeholder="Cliente"

value={client}

onChange={e=>setClient(e.target.value)}

/>


<br/><br/>



<input

placeholder="Proyecto"

value={project}

onChange={e=>setProject(e.target.value)}

/>


<br/><br/>



<input

type="number"

value={hours}

onChange={e=>setHours(Number(e.target.value))}

/>


<br/><br/>



<input

type="number"

value={rate}

onChange={e=>setRate(Number(e.target.value))}

/>


<br/><br/>



<select

value={complexity}

onChange={e=>setComplexity(Number(e.target.value))}

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



<br/><br/>




<select

value={urgency}

onChange={e=>setUrgency(Number(e.target.value))}

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



<br/><br/>




<input

type="number"

value={revisions}

onChange={e=>setRevisions(Number(e.target.value))}

/>



<br/><br/>



<input

type="number"

value={cost}

onChange={e=>setCost(Number(e.target.value))}

/>




<h3>
Subtotal:
{subtotal.toFixed(2)} €
</h3>



<h3>
IVA:
{vatAmount.toFixed(2)} €
</h3>



<h2>
TOTAL:
{total.toFixed(2)} €
</h2>



<h3>
Beneficio:
{profit.toFixed(2)} €
</h3>



<button onClick={saveQuote}>

Guardar presupuesto

</button>






<hr/>





<h2>
KPIs
</h2>


<p>
Facturación:
{revenue.toFixed(2)} €
</p>


<p>
Aceptados:
{
quotes.filter(
q=>q.status==="Aceptado"
).length
}
</p>


<p>
Pendientes:
{
quotes.filter(
q=>q.status==="Pendiente"
).length
}
</p>


<p>
Rechazados:
{
quotes.filter(
q=>q.status==="Rechazado"
).length
}
</p>







<input

placeholder="Buscar"

value={search}

onChange={e=>setSearch(e.target.value)}

/>





<h2>
Historial
</h2>





{

quotes

.filter(q=>

q.client
?.toLowerCase()
.includes(search.toLowerCase())

)

.map(q=>(


<div

key={q.id}

style={{

border:"1px solid #ccc",

padding:"15px",

margin:"15px 0"

}}

>



<h3>
{q.client}
</h3>


<p>
Proyecto:
{q.project}
</p>


<p>
Total:
{q.total} €
</p>



<p>
Estado:
{q.status}
</p>




<PDFGenerator quote={q}/>




<br/><br/>




<button

onClick={()=>updateQuote(
q.id,
{
status:"Aceptado"
}
)}

>

🟢 Aceptado

</button>





<button

onClick={()=>updateQuote(
q.id,
{
status:"Pendiente"
}
)}

>

🟡 Pendiente

</button>





<button

onClick={()=>updateQuote(
q.id,
{
status:"Rechazado"
}
)}

>

🔴 Rechazado

</button>






<button

onClick={()=>updateQuote(
q.id,
{
favorite:!q.favorite
}
)}

>

{
q.favorite
?
"⭐"
:
"☆"
}

</button>






<button

onClick={()=>{

const n=prompt(
"Nota",
q.notes
);


updateQuote(
q.id,
{
notes:n
}
);


}}

>

📝 Nota

</button>







<button

onClick={()=>deleteQuote(q.id)}

>

Eliminar

</button>





</div>



))


}



</div>


);


}



export default Dashboard;