import mongoose from 'mongoose'

const brandModelSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        unique: true
    },
    models: {
        type: Map,
        of: [String],
        required: true
    }
});
export const BModel=mongoose.models.BrandModel || mongoose.model("BrandModel",brandModelSchema);
