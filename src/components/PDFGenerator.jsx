import { jsPDF } from "jspdf";

function PDFGenerator({ quote }) {
  const generatePDF = () => {
    const doc = new jsPDF();
const company =
  localStorage.getItem("company") ||
  "";

const cif =
  localStorage.getItem("cif") ||
  "";

const email =
  localStorage.getItem("email") ||
  "";

const phone =
  localStorage.getItem("phone") ||
  "";

const address =
  localStorage.getItem("address") ||
  "";

    // Cabecera
    doc.setFontSize(24);
    doc.text("VALORA", 20, 20);
    doc.setFontSize(10);

doc.text(company, 140, 20);

doc.text(cif, 140, 26);

doc.text(email, 140, 32);

doc.text(phone, 140, 38);

doc.text(address, 140, 44);

    doc.setFontSize(18);
    doc.text("PRESUPUESTO", 20, 32);

    doc.line(20, 38, 190, 38);

    // Datos generales
    doc.setFontSize(12);

    doc.text(
      `Presupuesto Nº PRES-${String(
        quote.id
      ).slice(-6)}`,
      20,
      50
    );

    doc.text(
      `Fecha: ${quote.date}`,
      20,
      60
    );

    // Cliente
    doc.setFontSize(16);
    doc.text("CLIENTE", 20, 80);

    doc.setFontSize(12);

    doc.text(
      `Cliente: ${quote.client}`,
      20,
      92
    );

    doc.text(
      `Proyecto: ${quote.project}`,
      20,
      102
    );

    // Desglose
    doc.setFontSize(16);
    doc.text("DESGLOSE", 20, 125);

    doc.setFontSize(12);

    doc.text(
      `Horas estimadas: ${quote.hours}`,
      20,
      138
    );

    doc.text(
      `Tarifa por hora: ${quote.rate} €`,
      20,
      148
    );

    doc.text(
      `Complejidad: ${quote.complexity}`,
      20,
      158
    );

    doc.text(
      `Revisiones: ${quote.revisions}`,
      20,
      168
    );

    doc.text(
      `Urgencia: ${quote.urgency}`,
      20,
      178
    );

    // Totales
    doc.line(20, 190, 190, 190);

    doc.setFontSize(14);

    doc.text(
      `Subtotal: ${quote.subtotal} €`,
      20,
      205
    );

    doc.text(
      `IVA: ${quote.vatAmount} €`,
      20,
      215
    );

    doc.setFontSize(18);

    doc.text(
      `TOTAL: ${quote.total} €`,
      20,
      230
    );

    // Estado
    doc.setFontSize(12);

    doc.text(
      `Estado: ${quote.status}`,
      20,
      250
    );
    doc.setFontSize(9);

doc.text(
  "Este presupuesto tiene una validez de 30 días desde su emisión.",
  20,
  260
);

doc.text(
  "El inicio del proyecto requerirá la aceptación formal del presupuesto.",
  20,
  267
);

    // Pie
    doc.line(20, 265, 190, 265);

    doc.text(
      "Documento generado por Valora",
      20,
      278
    );

    doc.save(
      `Presupuesto-${quote.client}.pdf`
    );
  };

  return (
    <button onClick={generatePDF}>
      PDF
    </button>
  );
}

export default PDFGenerator;