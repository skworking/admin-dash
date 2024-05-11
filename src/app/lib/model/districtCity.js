import mongoose from 'mongoose'

const DistrictSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cities: {
        type: [String],
        required: true
    }
});
export const District =mongoose.models.district  || mongoose.model("district",DistrictSchema );
