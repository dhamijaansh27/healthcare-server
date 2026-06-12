import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true 
    },
    city: {
        type: String,
        required: true 
    },
    totalBeds:{
        type: Number,
        required: true
    },
    emergencyBeds:{
        type: Number,
        required: true
    },
});

export default mongoose.model("Hospital", hospitalSchema);