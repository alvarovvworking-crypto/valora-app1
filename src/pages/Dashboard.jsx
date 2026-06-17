import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import PriceCalculator from "../components/PriceCalculator";
import PDFGenerator from "../components/PDFGenerator";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
<div className="sidebar">
  <h2>VALORA</h2>

  <button>Dashboard</button>
  <button>Nuevo presupuesto</button>
  <button>Historial</button>
  <button>Configuración</button>

  <button onClick={handleLogout}>
    Cerrar sesión
  </button>
</div>

function Dashboard() {

  const handleLogout = async () => {
  await supabase.auth.signOut();
};

const [quotes, setQuotes] = useState([]);

const [search, setSearch] = useState("");

const [user, setUser] = useState(null);




// Obtener usuario + presupuestos

useEffect(()=>{

loadQuotes();

},[]);



const loadQuotes = async()=>{


const {

data:{user}

}=await supabase.auth.getUser();



setUser(user);



if(!user) return;



const {

data,

error

}=await supabase

.from("quotes")

.select("*")

.eq(
"user_id",
user.id
)

.order(
"created_at",
{
ascending:false
}
);



if(error){

console.error(error);

return;

}



setQuotes(data);



};






// Guardar desde PriceCalculator


const saveQuote = async (quote)=>{


if(!user){

alert("Usuario no encontrado");

return;

}



const {

data,

error

}=await supabase

.from("quotes")

.insert({

user_id:user.id,


client:quote.client,

project:quote.project,

project_type:quote.projectType,


hours:quote.hours,

rate:quote.rate,


complexity:quote.complexity,

revisions:quote.revisions,

urgency:quote.urgency,


cost:quote.cost,

subtotal:quote.subtotal,

vat_amount:quote.vatAmount,

total:quote.total,

profit:quote.profit,


status:"Pendiente",

notes:"",

favorite:false



})

.select()

.single();




if(error){

console.error(error);

alert("Error guardando presupuesto");

return;

}



setQuotes(prev=>[
data,
...prev
]);



};






// estadísticas


const acceptedQuotes =
quotes.filter(
(q)=>q.status==="Aceptado"
).length;



const pendingQuotes =
quotes.filter(
(q)=>q.status==="Pendiente"
).length;



const rejectedQuotes =
quotes.filter(
(q)=>q.status==="Rechazado"
).length;




const totalRevenue =
quotes.reduce(
(sum,q)=>
sum+Number(q.total||0),
0
);



const averageQuote =
quotes.length
?
totalRevenue/quotes.length
:
0;




const acceptanceRate =
quotes.length
?
(
acceptedQuotes/
quotes.length*100
).toFixed(1)
:
0;









// actualizar estado


const updateQuote = async(id,changes)=>{


await supabase

.from("quotes")

.update(changes)

.eq(
"id",
id
);



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








// eliminar


const deleteQuote = async(id)=>{


await supabase

.from("quotes")

.delete()

.eq(
"id",
id
);



setQuotes(prev=>

prev.filter(q=>q.id!==id)

);


};







// CSV


const exportCSV = ()=>{


const headers=[
"ID",
"Cliente",
"Proyecto",
"Total",
"Estado",
"Fecha"
];



const rows =
quotes.map(q=>[

q.id,

q.client,

q.project,

q.total,

q.status,

q.created_at

]);



const csv =
[headers,...rows]

.map(r=>r.join(","))

.join("\n");



const blob =
new Blob(
[csv],
{
type:
"text/csv;charset=utf-8;"
}
);



saveAs(
blob,
"presupuestos-valora.csv"
);



};









return (

<div style={{padding:"30px"}}>



<h1>
Dashboard Valora
</h1>





<div>


<strong>
Importe Medio
</strong>

<br/>

{averageQuote.toFixed(2)} €


</div>




<br/>



<Link to="/settings">

<button>

Configuración Empresa

</button>

</Link>



<button onClick={exportCSV}>

Exportar CSV

</button>





<hr/>




<div>


<strong>
Facturación:
</strong>

{totalRevenue.toFixed(2)} €



<br/>

<strong>
Aceptados:
</strong>

{acceptedQuotes}



<br/>

<strong>
Pendientes:
</strong>

{pendingQuotes}



<br/>

<strong>
Rechazados:
</strong>

{rejectedQuotes}



</div>








<PriceCalculator

onSave={saveQuote}

/>






<hr/>





<input

placeholder="Buscar..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

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

||

q.project
?.toLowerCase()
.includes(search.toLowerCase())

)


.map(q=>(



<div

key={q.id}

style={{

border:"1px solid #ccc",

padding:"15px",

marginBottom:"10px",

borderRadius:"10px"

}}

>




<h3>

PRES-{String(q.id).slice(-6)}

</h3>




<p>

Cliente:
{q.client}

</p>



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







{q.notes &&

<p>

Nota:
{q.notes}

</p>

}






<PDFGenerator

quote={q}

/>







<button

onClick={()=>

updateQuote(
q.id,
{
status:"Aceptado"
}
)

}

>

🟢 Aceptado

</button>






<button

onClick={()=>

updateQuote(
q.id,
{
status:"Rechazado"
}
)

}

>

🔴 Rechazado

</button>







<button

onClick={()=>{


const note =
prompt(
"Nota",
q.notes || ""
);



updateQuote(

q.id,

{
notes:note
}

);



}}

>

📝 Nota

</button>







<button

onClick={()=>


updateQuote(

q.id,

{
favorite:
!q.favorite
}

)


}

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

onClick={()=>deleteQuote(q.id)}

>

Eliminar

</button>
<button onClick={handleLogout}>
  Cerrar sesión
</button>





</div>



))


}







</div>


);


}


export default Dashboard;