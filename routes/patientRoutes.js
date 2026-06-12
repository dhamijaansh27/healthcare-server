import express from 'express';
import Patient from '../model/Patient.js';
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const patient = new Patient({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      state: req.body.state,
      address: req.body.address,
      password: req.body.password
    });

    await patient.save();

    try {

      await sendEmail(
        patient.email,
        "Welcome to HealthCare+",
        `Hello ${patient.name},

Your account has been successfully created.

Thank you for joining HealthCare+.`
      );

    } catch (emailError) {

      console.log(
        "Email sending failed:",
        emailError.message
      );

    }

    const token = jwt.sign(

      {
        id: patient._id,
        role: "patient"
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.status(201).json({

      message:
      "Patient Registered Successfully",

      patient,

      token

    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({
      message: error.message
    });

  }

});

router.post("/login", async (req,res)=>{

  try{

    const patient = await Patient.findOne({
      email:req.body.email
    });

    if(!patient){
      return res.status(404).json({
        message:"Patient not found"
      });
    }

    if(patient.password !== req.body.password){
      return res.status(401).json({
        message:"Invalid Password"
      });
    }

    const token = jwt.sign(

      {
        id: patient._id,
        role: "patient"
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      token,

      patient

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

});

router.put("/:id", async (req, res) => {

  try {

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
        gender: req.body.gender,
        state: req.body.state,
        address: req.body.address
      },
      { new: true }
    );

    res.json({
      message: "Profile Updated Successfully",
      patient
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;