const pdfParse = require("pdf-parse");
const {askAiForQnA , askForSummary , askAIforQuiz , askAIforTrueFalse} = require('../utils/aiHelpers');
const pdfModel = require('../model/pdf.Model');
const summaryModel = require('../model/summaries.Model');
const trueFalseModel = require('../model/trueFalse.model');
const quizModel = require('../model/quizz.Model');
const qaModel = require('../model/qa.Model');
const pdfDashboardModel = require('../model/pdf.Dashboard.Model');
const pdfHistoryModel = require('../model/pdfHistory.Model');

module.exports.uploadPdfAndGenerate = async (req , res , next) => {
    try{
      if (!req.file) {
      return res.status(400).json({ message: "No PDF file uploaded" });
    }

    const data = await pdfParse(req.file.buffer);

    const response = await askForSummary(data.text);

    if (response.error) {
        return res.status(500).json({ error: response.error });
    }
    
    const summary = Array.isArray(response?.summary) ? response.summary : [];

    const qnaResponse = await askAiForQnA(data.text);

    if (qnaResponse.error) {
        return res.status(500).json({ error: qnaResponse.error });
    }
    const qna =  Array.isArray(qnaResponse.qna) ? qnaResponse.qna : qnaResponse.qna;

    const quizzResponse = await askAIforQuiz(data.text);
    if (quizzResponse.error) {
        return res.status(500).json({ error: quizzResponse.error });
    }
    const quiz = Array.isArray(quizzResponse.quiz) ? quizzResponse.quiz : quizzResponse.quiz;

    const trueFalseResponse = await askAIforTrueFalse(data.text);
    if (trueFalseResponse.error) {
        return res.status(500).json({ error: trueFalseResponse.error });
    }
    const trueFalse = Array.isArray(trueFalseResponse.trueFalse) ? trueFalseResponse.trueFalse : trueFalseResponse.trueFalse;
   
    const pdf = await pdfModel.create({
        title: req.file.originalname,
        userId: req.user._id 
    });

    if (!pdf) {
        return res.status(500).json({ error: "Failed to save PDF metadata" });
    }

    const newsummary = await summaryModel.create({
        pdfId: pdf._id,
        userId: req.user._id,
        bulletPoints: summary
    });

    if (!newsummary) {
        return res.status(500).json({ error: "Failed to save summary" });
    }

    const newQnA = await qaModel.create({
        pdfId: pdf._id,
        userId: req.user._id,
        qas: qna
    });

    if (!newQnA) {
        return res.status(500).json({ error: "Failed to save Q&A" });
    }

    const newQuiz = await quizModel.create({
        pdfId: pdf._id,
        userId: req.user._id,
        questions: quiz
    });

    if (!newQuiz) {
        return res.status(500).json({ error: "Failed to save quiz" });
    }

    const formattedTrueFalse = trueFalse.map(item => ({
  question: item.question,
  answer: item.answer.toLowerCase() === 'true' // convert string to Boolean
}));


    const newTrueFalse = await trueFalseModel.create({
        pdfId: pdf._id,
        userId: req.user._id,
        questions: formattedTrueFalse
    });

    if (!newTrueFalse) {
        return res.status(500).json({ error: "Failed to save true/false questions" });
    }

    // Return the response with the generated data

    const updateDashboard = await pdfDashboardModel.findOneAndUpdate(
  { userId: req.user._id },
  { $inc: { "pdf.number": 1 } },
  { new: true }
);
    if (!updateDashboard) {
        return res.status(500).json({ error: "Failed to update PDF dashboard" });
    }

    const newHistory = await pdfHistoryModel.create({
        pdfId: pdf._id,
        userId: req.user._id,
        pdfTitle: req.file.originalname,
    })

    if (!newHistory) {
        return res.status(500).json({ error: "Failed to save PDF history" });
    }

    return res.status(200).json({
        message: "PDF uploaded and data generated successfully",
        pdfId:pdf._id
    });

    
    }catch (error) {
        console.error("Error in uploadPdfAndGenerate:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}