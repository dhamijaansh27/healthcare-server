import express from "express";
import Appointment from "../model/Appointment.js";
import Patient from "../model/Patient.js";
import Doctor from "../model/Doctor.js";
import { sendEmail } from "../utils/sendEmail.js";
import authmiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/create",authmiddleware, async (req, res) => {

  try {

    const appointment =
      await Appointment.create(req.body);

    res.status(201).json({
      message: "Appointment Created",
      appointment
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get(
  "/hospital/:hospitalId",
  async (req, res) => {

     try {

    const appointments = await Appointment.find({
      hospitalId: req.params.hospitalId
    })
    .populate("patientId")
    .populate("doctorId");

    res.json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get(
  "/patient/:patientId",
  async (req, res) => {

    const appointments =
      await Appointment.find({
        patientId: req.params.patientId
      })
      .populate("doctorId")
      .populate("hospitalId");

    res.json(appointments);

});

router.put("/:id/status", async (req, res) => {

  try {

    const appointment =
      await Appointment.findById(
        req.params.id
      )
      .populate("patientId")
      .populate("doctorId")
      .populate("hospitalId");

    if (!appointment) {

      return res.status(404).json({
        message: "Appointment not found"
      });

    }

    appointment.status =
      req.body.status;

    await appointment.save();

    // Send Email on Approval

    if (req.body.status === "Approved") {


      await sendEmail(

        appointment.patientId.email,

        "Appointment Approved",

        `Hello ${appointment.patientId.name},

        Your appointment has been approved.

        Hospital:
        ${appointment.hospitalId.name}

        Doctor:
        ${appointment.doctorId.name}

        Date:
        ${appointment.appointmentDate}

        Time:
        ${appointment.appointmentTime}

        Thank you for choosing HealthCare+.`

      );

    }

    // Send Email on Rejection

    if (req.body.status === "Rejected") {

      await sendEmail(

        appointment.patientId.email,

        "Appointment Rejected",

        `Hello ${appointment.patientId.name},

        Unfortunately your appointment request has been rejected.

        Please login and book another appointment.

        Regards,
        HealthCare+`

      );

    }

    res.json(appointment);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


router.get(
  "/hospital/:hospitalId/patients",
  async (req, res) => {

    try {

      const appointments = await Appointment.find({
        hospitalId: req.params.hospitalId,
        status:"Approved"
      })
      .populate("patientId")
      .populate("doctorId");

      res.json(appointments);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

});

router.put(
"/:appointmentId/prescription",
async (req,res) => {

  await Appointment.findByIdAndUpdate(

    req.params.appointmentId,

    {
      prescriptionAdded: true
    }

  );

  res.json({
    message:
    "Prescription Updated"
  });

});

export default router;