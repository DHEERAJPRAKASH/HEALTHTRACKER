import mongoose from 'mongoose';
const { Schema } = mongoose;

const DetailUserSchema = new Schema({
    dob:{
        type: Date,
        required: true
    },
    worknature:{
        type: String,
        required: true

    },
    medicalhistory:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('detailuser',DetailUserSchema);