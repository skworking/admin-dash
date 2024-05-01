import mongoose from 'mongoose'

const stateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: Map,
        of: [String],
        required: true
    }
});
export const StateModel=mongoose.models.stateModel || mongoose.model("stateModel",stateSchema);
