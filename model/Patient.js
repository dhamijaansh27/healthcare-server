import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,           
    required: true
    },        
    age: {  
    type: Number,
    required: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    phone: {
    type: String,
    required: true 
    },
    state: {
    type: String,   
    required: true
    },
    address: {
    type: String,
    required: true
    },
    gender: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    }   
});

export default mongoose.model('Patient', patientSchema);