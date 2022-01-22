const mongoose = require('mongoose');
const { Schema } = mongoose;

const UploadDetailSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    doctor:{
        type:String,
        required:true
    },
    worknature:{
        type: String,
        required: true

    },
    exercisedaily:{
        type: Boolean,
        required: true
    },
    eatingdiet:{
        type: Boolean,
        required: true
    },
    alcoholconsumption:{
        type: Boolean,
        required: true
    },
    caffeineconsumption:{
        type: Boolean,
        required: true
    },
    smoking:{
        type: Boolean,
        required: true
    },
    othercomments:{
        type: String,
        required: true
    },
    list_of_drug_allergies:{
        type: String,
        required: true
    },
    other_illnesses:{
        type: String,
        required: true
    },
    list_of_operations:{
        type: String,
        required: true
    },
    list_of_current_medications:{
        type: String,
        required: true
    },
    complaint:{
        type:String,
        default: ""
    },
    doctorComments:{
        type: String,
        // required:true,
        default:""
    },
    date:{
        type: Date,
        default: Date.now
    },
    
    
});

module.exports = mongoose.model('uploaduser',UploadDetailSchema);