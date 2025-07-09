const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pdf", 
    required: true
  },
  quizzAnswer:[
        {
            question:String,
            options:[String],
            correctAnswer:String,
            userAnswer:String
        }
    ],
    trueFalseAnswer:[
        
        {
            question: String,
            answer: Boolean ,
            userAnswer:Boolean
        }
        
    ],
    
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserAnswer", userAnswerSchema);
