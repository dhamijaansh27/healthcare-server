import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },

  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true
  },

  medicines: [
    {
      medicineName: String,
      dosage: String,
      duration: String
    }
  ],

  notes: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model(
  "Prescription",
  prescriptionSchema
);