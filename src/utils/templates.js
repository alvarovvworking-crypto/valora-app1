export const TAndC_TEMPLATE = (project) => `
TÉRMINOS Y CONDICIONES DE SERVICIOS PROFESIONALES - VALORA

1. ALCANCE DEL PROYECTO: 
El prestador se compromete a realizar el proyecto "${project.name}" con una dedicación estimada de ${project.hours} horas. 

2. POLÍTICA DE REVISIONES:
Se incluyen ${project.revisions} rondas de cambios. Cualquier revisión adicional fuera de este límite será facturada con un recargo del 5% sobre el valor total del proyecto.

3. PROPIEDAD INTELECTUAL:
Los derechos de propiedad intelectual se transferirán al cliente únicamente una vez recibido el pago total del importe acordado.

4. PAGOS Y PLAZOS:
El importe total es de €${project.total}. Se requiere un anticipo del 50% para iniciar la ejecución y el 50% restante a la entrega final.
`;
