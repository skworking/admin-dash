import mongoose from 'mongoose'

const TeshilSchema = new mongoose.Schema({
    // state: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // district: {
    //     type: Map,
    //     of: [String],
    //     required: true
    // },
    // teshil:{
    //     type:Map,
    //     of:[String],
    //     required:true
    // }
    state: {
        type: String,
        required: true,
        unique: true
    },
    district: {
        type: Object,
        required: true
    },
    teshil: {
        type: Object,
        required: true
    }
});
export const TeshilModel=mongoose.models.teshilModel || mongoose.model("teshilModel",TeshilSchema);