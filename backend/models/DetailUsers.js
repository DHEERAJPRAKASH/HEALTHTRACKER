const mongoose = require('mongoose');
const { Schema } = mongoose;

const DetailUserSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
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
    date:{
        type: Date,
        default: Date.now
    },
    userImage:{ 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('detailuser',DetailUserSchema);