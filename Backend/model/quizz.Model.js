const mongoose = require('mongoose');

const quizzSchema = new mongoose.Schema({
    pdfId : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pdf'
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    questions:[
        {
            question:String,
            options:[String],
            correctAnswer:String
        }
    ],
    createdAt:{type:Date, default:Date.now}
    
});

const quizzModel = mongoose.model('Quizz' , quizzSchema)

module.exports = quizzModel