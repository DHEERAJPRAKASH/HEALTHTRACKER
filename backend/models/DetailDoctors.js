import mongoose from 'mongoose';
const { Schema } = mongoose;

const DetailDoctorSchema = new Schema({
    dob:{
        type: Date,
        required: true
    },
    experience:{
        type: Number,
        required: true

    },
    designation:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('detaildoctor',DetailDoctorSchema);