const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const pdfModel = mongoose.model('Pdf', pdfSchema);
module.exports = pdfModel;