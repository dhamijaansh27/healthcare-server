import express from "express";
import Hospital from "../model/Hospital.js";

const router = express.Router();

router.get("/", async(req,res) => {
  const hospitals = await Hospital.find();

  res.json(hospitals);
})

router.post("/hospital-register", async (req, res) => {

  try {

    const hospital =
      await Hospital.create(req.body);

    res.status(201).json({
      message:
      "Hospital Registered Successfully",
      hospital
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// Get hospital by id
router.get("/:id", async (req, res) => {

  const hospital = await Hospital.findById(
    req.params.id
  );

  res.json(hospital);

});


// Hospital Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const hospital = await Hospital.findOne({
    email
  });

  if (!hospital) {
    return res.status(400).json({
      message: "Hospital not found"
    });
  }

  if (hospital.password !== password) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  res.json({
    message: "Login Successful",
    hospital
  });

});

export default router;