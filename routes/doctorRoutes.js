import express from "express";
import Doctor from "../model/Doctor.js";

const router = express.Router();

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find()
    .populate("hospitalId");

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post(
  "/create",
  async (req, res) => {

    try {

      const doctor =
      await Doctor.create({

        name:
        req.body.name,

        specialization:
        req.body.specialization,

        experience:
        req.body.experience,

        image:
        req.body.image,

        hospitalId:
        req.body.hospitalId

      });

      res.status(201).json({

        message:
        "Doctor Added",

        doctor

      });

    } catch (error) {

      res.status(500).json({

        message:
        error.message

      });

    }

});

router.get("/hospital/:hospitalId", async (req, res) => {

  const doctors = await Doctor.find({
    hospitalId: req.params.hospitalId,
    isAvailable: true
  });

  res.json(doctors);

});

export default router;