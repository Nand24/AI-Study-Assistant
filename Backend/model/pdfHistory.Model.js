const mongoose = require('mongoose');

const pdfHistorySchema = new mongoose.Schema({
    pdfId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pdf',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pdfTitle:{
        type: String,
        required: true
    },
    totalQuestionAttempted: {
        type: Number,
        default: 0
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    wrongAnswers: {
        type: Number,
        default: 0
    },
    score:{
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default: Date.now
    }   
})

const pdfHistoryModel = mongoose.model('PdfHistory', pdfHistorySchema);
module.exports = pdfHistoryModel;