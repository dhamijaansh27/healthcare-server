import express from "express";
import Hospital from "../model/Hospital.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    console.log(req.body);

  const { email, password } = req.body;

  const hospital = await Hospital.findOne({
    email,
    password
  });
  console.log(hospital);

  if (!hospital) {
    return res.status(400).json({
      message: "Invalid Credentials"
    });
  }

  res.json({
    message: "Login Successful",
    hospital
  });

});

export default router;