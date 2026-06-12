import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  appointmentDate: {
    type: String,
    required: true
  },

  appointmentTime: {
    type: String,
    required: true
  },

  problem: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  },

  prescriptionAdded: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

export default mongoose.model(
  "Appointment",
  appointmentSchema
);