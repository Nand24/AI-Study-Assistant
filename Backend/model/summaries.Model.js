const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    pdfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pdf',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bulletPoints:[String],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const summaryModel = mongoose.model('Summary', summarySchema);
module.exports = summaryModel;