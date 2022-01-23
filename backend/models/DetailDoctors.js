const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetailDoctorSchema = new Schema({

    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },
    name:{
        type: String,
        required: true

    },
    experience:{
        type: String,
        required: true

    },
    designation:{
        type: String,
        required: true
    },
    working:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('detaildoctor',DetailDoctorSchema);