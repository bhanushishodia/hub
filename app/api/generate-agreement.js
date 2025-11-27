export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const form = req.body;

    // PDF TEMPLATE PATH
    const pdfPath = path.join(
      process.cwd(),
      "public",
      "pdf",
      "Anantya-Short-Agreement-2025.pdf"
    );

    const templateBytes = fs.readFileSync(pdfPath);

    // LOAD PDF
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // FIELD POSITIONS (Yahan par sab fields ka location add karna hota hai)
const fieldPositions = {
  onDate: { x: 440, y: 725 },
  effectiveDate: { x: 180, y: 715 },

  companyName: { x: 240, y: 704 },
  vendorCompany: { x: 53, y: 590 },

  gstType: { x: 200, y: 585 },
  gstNumber: { x: 200, y: 580 },

  companyAddress: { x: 53, y: 549 },

  pocName: { x: 220, y: 569 },
  pocDesignation: { x: 350, y: 569 },

  conversationCountry: { x: 150, y: 580 },
  conversationCurrency: { x: 150, y: 560 },

  marketingPrice: { x: 150, y: 540 },
  utilityPrice: { x: 150, y: 520 },
  authPrice: { x: 150, y: 500 },
  uiPrice: { x: 150, y: 480 },

  // Recurring
  validTime: { x: 150, y: 460 },
  validTime2: { x: 150, y: 445 },
  validTimeRecuring: { x: 150, y: 430 },

  // One-time / Yearly
  oneTime: { x: 150, y: 415 },
  yearlyRecuring: { x: 150, y: 400 },

  // Vendor copies
  vendorCompany2: { x: 53, y: 380 },
  vendorCompany3: { x: 53, y: 365 },

  pocName3: { x: 220, y: 350 },
  pocDesignation3: { x: 350, y: 350 },
  pocDesignation2: { x: 350, y: 335 },

  // Addons
  addon: { x: 150, y: 320 },
  addonName: { x: 150, y: 305 },
  addonFrequency: { x: 150, y: 290 },

  marketingPrice1: { x: 150, y: 275 },
  utilityPrice2: { x: 150, y: 260 },
  authPrice3: { x: 150, y: 245 },
  uiPrice4: { x: 150, y: 230 },

  currencyAmount: { x: 150, y: 215 },

  // Message Ports (Fail / Sent / Seen / Delivered)
  messagePort: { x: 150, y: 200 }, // If all selected → comma separated  
};


    // PRINT ALL FIELDS AUTOMATICALLY
 Object.keys(fieldPositions).forEach((key) => {
  const pos = fieldPositions[key];
  let value = form[key] || "";

  // HANDLE MESSAGE PORT ARRAY → COMMA SEPARATED
  if (key === "messagePort" && Array.isArray(form.messagePort)) {
    value = form.messagePort.join(", ");
  }

  // DRAW TEXT IN BOLD (Helvetica Bold)
  page.drawText(String(value), {
    x: pos.x,
    y: pos.y,
    size: 8,
    font: font,
    fontWeight: "bold",
  });
});

    // SAVE PDF
    const pdfBytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Agreement.pdf"'
    );
    return res.status(200).send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return res.status(500).json({ error: "PDF generation failed" });
  }
}
