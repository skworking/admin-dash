import mongoose from "mongoose";

const vehicleSchema  = new mongoose.Schema({
    vehicleDetails: {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        yearOfPurchase: { type: Number, required: true }
    },
    rcStatus: {
        rcStatus: { type: String, required: true },
        permit: {
            type: { type: String, required: true },
            validity: { type: Date, required: true }
        },
        fitnessValidity: { type: Date, required: true },
        insuranceValidity: { type: Date, required: true },
        taxValidity: { type: Date, required: true }
    },
    images: [{ imageurl: String }],
    price: { type: Number, required: true },
    drivenKilometers: { type: Number, required: true },
    overview: { type: String, required: true },
    userDetails: {
        userName: { type: String, required: true },
        userMobileNo: { type: String, required: true },
        userEmail: { type: String, required: true },
        address: {
            state: { type: String, required: true },
            district: { type: String, required: true },
            tehsil: { type: String, required: true }
        }
    }
});
export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema );