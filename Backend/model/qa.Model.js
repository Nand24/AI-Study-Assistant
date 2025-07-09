const mongoose = require('mongoose');

const qaSchema = new mongoose.Schema({
    pdfId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Pdf' 
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    qas:[
        {
            question : String,
            answer : String
        }
    ],
    createdAt : {type: Date, default:Date.now}
});

const qaModel = mongoose.model('Qa' , qaSchema);

module.exports = qaModel;