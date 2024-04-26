import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    drivenkm: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rcStatus: {
        rcStatus: {
            type: String,
            required: true
        },
        permit: String,
        fitnessValidity: String,
        insuranceValidity: String,
        taxValidity: String
    },
    overview: {
        type: String,
        required: true
    },
    userDetails: {
        username: {
            type: String,
            required: true
        },
        mno: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            state: String,
            district: String,
            tehshil: String
        }
    }
});

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema );