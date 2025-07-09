const mongoose = require('mongoose');

const trueFalseSchema = new mongoose.Schema({
    pdfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pdf',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [
        {
            question: String,
            answer: Boolean // true or false
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const trueFalseModel = mongoose.model('TrueFalse', trueFalseSchema);
module.exports = trueFalseModel;