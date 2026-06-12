import mongoose from 'mongoose';
import Hospital from '../model/Hospital.js';

await mongoose.connect(
  "mongodb://localhost:27017/HealthCare"
);

await Hospital.insertMany([
  {
    "name": "Apollo Hospital",
    "state": "Delhi",
    "city": "New Delhi",
    "email": "apollo@hospital.com",
    "password": "apollo123",
    "location": "Sarita Vihar",
    "contact": "011-12345678",
    "totalBeds": 500,
    "emergencyBeds": 50
  },
  {
    "name": "Fortis Hospital",
    "state": "Maharashtra",
    "city": "Mumbai",
    "email": "fortis@hospital.com",
    "password": "fortis123",
    "location": "Mulund West",
    "contact": "022-12345678",
    "totalBeds": 400,
    "emergencyBeds": 40
  },
  {
    "name": "Max Super Speciality Hospital",
    "state": "Uttarakhand",
    "city": "Dehradun",
    "email": "max@hospital.com",
    "password": "max123",
    "location": "Mussoorie Road",
    "contact": "0135-12345678",
    "totalBeds": 300,
    "emergencyBeds": 30
  },
  {
    "name": "AIIMS",
    "state": "Delhi",
    "city": "New Delhi",
    "email": "aiims@hospital.com",
    "password": "aiims123",
    "location": "Ansari Nagar",
    "contact": "011-12345678",
    "totalBeds": 800,
    "emergencyBeds": 100
  }
]);

console.log("Hospitals seeded successfully!");
process.exit();