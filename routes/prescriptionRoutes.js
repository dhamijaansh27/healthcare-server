import express from "express";
import Prescription from "../model/Prescription.js";
import PDFDocument from "pdfkit";


const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const prescription = new Prescription(req.body);

    await prescription.save();

    res.status(201).json({
      message: "Prescription Created",
      prescription
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/patient/:patientId", async (req, res) => {

  try {

    const prescriptions =
      await Prescription.find({
        patientId: req.params.patientId
      })
      .populate("doctorId")
      .populate("hospitalId");

    res.json(prescriptions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get(
  "/download/:id",
  async (req, res) => {

    try {

      const prescription =
      await Prescription.findById(
        req.params.id
      )
      .populate("patientId")
      .populate("doctorId")
      .populate("hospitalId");

      if (!prescription) {

        return res.status(404).json({
          message: "Prescription not found"
        });

      }

      const doc = new PDFDocument({
        margin: 50
      });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=Prescription-${prescription._id}.pdf`
      );

      doc.pipe(res);

      // ==================================
      // HOSPITAL HEADER
      // ==================================

      doc
        .rect(40, 30, 520, 90)
        .stroke();

      doc
        .fontSize(24)
        .text(
          prescription.hospitalId.name,
          40,
          45,
          {
            align: "center"
          }
        );

      doc
        .fontSize(12)
        .text(
          `${prescription.hospitalId.location}, ${prescription.hospitalId.city}, ${prescription.hospitalId.state}`,
          {
            align: "center"
          }
        );

      doc
        .text(
          `Contact : ${prescription.hospitalId.contact}`,
          {
            align: "center"
          }
        );

      doc.moveDown(3);

      // ==================================
      // TITLE
      // ==================================

      doc
        .fontSize(18)
        .text(
          "MEDICAL PRESCRIPTION",
          {
            align: "center",
            underline: true
          }
        );

      doc.moveDown(1);

      // ==================================
      // PRESCRIPTION INFO
      // ==================================

      doc.fontSize(12);

      doc.text(
        `Prescription ID : ${prescription._id}`
      );

      doc.text(
        `Date : ${new Date(
          prescription.createdAt
        ).toLocaleDateString()}`
      );

      doc.moveDown();

      // ==================================
      // PATIENT DETAILS
      // ==================================

      doc
        .fontSize(14)
        .text(
          "PATIENT DETAILS",
          {
            underline: true
          }
        );

      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .text(
          `Name : ${prescription.patientId.name}`
        );

      doc.text(
        `Age : ${prescription.patientId.age}`
      );

      doc.text(
        `Gender : ${prescription.patientId.gender}`
      );

      doc.text(
        `Phone : ${prescription.patientId.phone}`
      );

      doc.moveDown();

      // ==================================
      // DOCTOR DETAILS
      // ==================================

      doc
        .fontSize(14)
        .text(
          "DOCTOR DETAILS",
          {
            underline: true
          }
        );

      doc.moveDown(0.5);

      doc
        .fontSize(12)
        .text(
          `Doctor : ${prescription.doctorId.name}`
        );

      doc.text(
        `Specialization : ${prescription.doctorId.specialization}`
      );

      doc.moveDown();

      // ==================================
      // MEDICINES TABLE
      // ==================================

      doc
        .fontSize(14)
        .text(
          "MEDICATIONS",
          {
            underline: true
          }
        );

      doc.moveDown();

      let tableTop = doc.y;

      doc.rect(
        50,
        tableTop,
        500,
        25
      ).stroke();

      doc.text(
        "Medicine",
        60,
        tableTop + 7
      );

      doc.text(
        "Dosage",
        260,
        tableTop + 7
      );

      doc.text(
        "Duration",
        410,
        tableTop + 7
      );

      let y = tableTop + 25;

      prescription.medicines.forEach(
        (medicine) => {

          doc.rect(
            50,
            y,
            500,
            25
          ).stroke();

          doc.text(
            medicine.medicineName,
            60,
            y + 7
          );

          doc.text(
            medicine.dosage,
            260,
            y + 7
          );

          doc.text(
            medicine.duration,
            410,
            y + 7
          );

          y += 25;

        }
      );

      doc.y = y + 20;

      // ==================================
      // NOTES
      // ==================================
      doc.moveDown();
      doc.x = 40;
      doc
        .fontSize(14)
        .text(
          "DOCTOR NOTES",
          {
            underline: true,
            align:"left"
          }
        );

      doc.moveDown();

      doc
        .fontSize(12)
        .text(
          prescription.notes ||
          "No additional notes.",
          {
            width: 500,
            align: "left"
          }
        );

      doc.moveDown(4);

      // ==================================
      // SIGNATURE
      // ==================================

      

      doc.text(
        prescription.doctorId.name,
        {
          align: "right"
        }
      );

      doc.text(
        "Authorized Doctor",
        {
          align: "right"
        }
      );

      doc.moveDown(3);

      // ==================================
      // FOOTER
      // ==================================

    
    doc
      .strokeColor("#cccccc")
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.moveDown();

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("gray")
      .text(
        "Generated by HealthCare+ | Digital Prescription System",
        {
          align: "center"
        }
      );

      doc.end();

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

});

export default router;