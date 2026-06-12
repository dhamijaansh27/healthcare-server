import mongoose from "mongoose";
import Doctor from "../model/Doctor.js"; 

await mongoose.connect(
  "mongodb://localhost:27017/HealthCare"
);

await Doctor.insertMany([
  {
    name: "Dr. Rajesh Sharma",
    specialization: "Cardiologist",
    experience: "15 Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5a9"),
  },
  {
    name: "Dr. Priya Verma",
    specialization: "Dermatologist",
    experience: "10 Years",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5a9"),
  },
  {
    name: "Dr. Amit Gupta",
    specialization: "Neurologist",
    experience: "12 Years",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5a9"),
  },
  {
    name: "Dr. Neha Kapoor",
    specialization: "Pediatrician",
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5a9")
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "Orthopedic",
    experience: "14 Years",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5aa")
  },
  {
    name: "Dr. Anjali Mehta",
    specialization: "Gynecologist",
    experience: "11 Years",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5aa")
  },
  {
    name: "Dr. Rohit Khanna",
    specialization: "ENT Specialist",
    experience: "9 Years",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5aa")
  },
  {
    name: "Dr. Karan Malhotra",
    specialization: "Ophthalmologist",
    experience: "13 Years",
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471",
    hospitalId: new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5ab")
  },
  {
    name: "Dr. Riya Sharma",
    specialization: "Cardiologist",
    experience: "15 Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    hospitalId:  new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5ab")
  },
  {
    name: "Dr. Pooja Arora",
    specialization: "General Physician",
    experience: "6 Years",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309",
    hospitalId: new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5ac")
  },
  {
    name: "Dr. Anpurna",
    specialization: "Pediatrician",
    experience: "8 Years",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309",
    hospitalId: new mongoose.Types.ObjectId("6a2718feb7a5fab424c0a5ac")
  }
]);

console.log("Doctors Added");
process.exit();