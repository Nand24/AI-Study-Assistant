const userModel = require('../model/user.Model');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const  {bcryptPassword} = require('../utils/bcryptPassword');
const {generateToken} = require('../utils/genrateToken');
const pdfDashboardModel = require('../model/pdf.Dashboard.Model');
const pdfHistoryModel = require('../model/pdfHistory.Model');
const pdfModel = require('../model/pdf.Model');
const summaryModel = require('../model/summaries.Model');
const trueFalseModel = require('../model/trueFalse.model');
const quizModel = require('../model/quizz.Model');
const qaModel = require('../model/qa.Model');
const userAnswerModel =  require('../model/userAnswer.Model');
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req , res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{

        const {username, email , password} = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({message:'User already exists with this email'});
        }
        const hashedPassword = await bcryptPassword(password);
        
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = await generateToken(user);
        res.cookie('token', token, {httpOnly: true,});

        const pdfDashboard = await pdfDashboardModel.create({
                userId: user._id,
            })
        
            if (!pdfDashboard) {
                return res.status(500).json({ error: "Failed to save PDF dashboard" });
            }

        res.status(200).json({
            message: 'User registered successfully',
        });
    }catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.loginUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    try{
        const {email , password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = await generateToken(user);
        res.cookie('token', token, {httpOnly: true,});

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            message: 'User logged in successfully',
            user: userWithoutPassword,
            token: token
        });

    }
    catch(error){
        console.error('Error during user login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.logoutUser = async (req , res) => {
    res.cookie('token','');
    res.clearCookie('token');
    res.status(200).json({message: 'User logged out successfully'});
}

module.exports.verifyToken = async (req , res) => {
const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true }); 
  } catch (err) {
    res.status(401).json({ valid: false });
  }
};

module.exports.getuserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getDashboard = async (req, res) => {
    try{
        const dashboard = await pdfDashboardModel.findOne({ userId: req.user._id });
        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found' });
        }
        
        res.status(200).json(dashboard);

    }catch (error) {
        console.error('Error fetching dashboard:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.pdfHistory = async (req , res , next ) => {

   const {pdfId} = req.params;

    try{
        if (!pdfId) {
            return res.status(400).json({ message: 'PDF ID is required' });
        }

        const history = await pdfHistoryModel.findOne({ pdfId: pdfId})

        if (!history) {
            return res.status(404).json({ message: 'PDF history not found' });
        }

        res.status(200).json(history);

    }catch (error) {
        console.error('Error fetching PDF history:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports.getPdfList = async (req, res , next) => {
    try{
        const pdf = await pdfModel.find({ userId: req.user._id })

        if (!pdf || pdf.length === 0) {
            return res.status(404).json({ message: 'No PDFs found for this user' });
        }

        res.status(200).json(pdf);
    }
    catch (error) {
        console.error('Error fetching PDF list:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.pdfStudyData = async (req, res , next) => {

    const { pdfId } = req.params;

    try {
        if (!pdfId) {
            return res.status(400).json({ message: 'PDF ID is required' });
        }

        const summary = await summaryModel.findOne({ pdfId: pdfId});

        if (!summary) {
            return res.status(404).json({ message: 'Summary not found for this PDF' });
        }

        const trueFalse = await trueFalseModel.findOne({ pdfId: pdfId});

        if (!trueFalse) {
            return res.status(404).json({ message: 'True/False questions not found for this PDF' });
        }

        const quiz = await quizModel.findOne({ pdfId: pdfId});

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found for this PDF' });
        }

        const qna = await qaModel.findOne({ pdfId: pdfId });

        if (!qna) {
            return res.status(404).json({ message: 'Q&A not found for this PDF' });
        }

        const pdf = await pdfModel.findById(pdfId).select('title');

        if (!pdf) {
            return res.status(404).json({ message: 'PDF not found' });
        }

        res.status(200).json({
            message: 'PDF study data fetched successfully',
            pdf : pdf,
            summary :summary.bulletPoints,
            trueFalse : trueFalse.questions,
            quiz: quiz.questions,
            qna: qna.qas
        })

    } catch (error) {
        console.error('Error fetching PDF study data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getUserAnswer = async (req, res , next) => {

    const { pdfId } = req.params

    try{

        if(!pdfId) {
            return res.status(400).json({ message: 'PDF ID is required' });
        }

        const userAnswers = await userAnswerModel.findOne({ pdfId: pdfId});
        
        if (!userAnswers) {
            return res.status(200).json({ message: 'User answers not fill yet' , value:false});
        }
        res.status(200).json({
            message: 'User answers fetched successfully',
            value:true,
            userAnswers
        });
    }catch(err){
        console.error('Error fetching PDF study data:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.updateUserAnswer = async (req, res) => {
  const { pdfId, quizzAnswer, trueFalseAnswer } = req.body;

  try {
    if (!pdfId || !quizzAnswer || !trueFalseAnswer) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save/update user answers
    const userAnswers = await userAnswerModel.findOneAndUpdate(
  { pdfId: pdfId, userId: req.user._id },
  {
    $set: {
      quizzAnswer,
      trueFalseAnswer,
      submittedAt: new Date()
    },
    $setOnInsert: {
      userId: req.user._id,
      pdfId: pdfId
    }
  },
  { new: true, upsert: true }
);
    // --- Correct Score Logic Starts Here ---
    const totalQuestions = quizzAnswer.length + trueFalseAnswer.length;

    const correctQuizAnswers = quizzAnswer.filter(q => {
      const correctIndex = q.correctAnswer.charCodeAt(0) - 65; // "A" → 0
      return q.options[correctIndex] === q.userAnswer;
    }).length;

    const correctTrueFalseAnswers = trueFalseAnswer.filter(q => q.userAnswer === q.answer).length;

    const correctAnswers = correctQuizAnswers + correctTrueFalseAnswers;
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = (correctAnswers / totalQuestions) * 100;

    // --- Update pdfHistory ---
   const pdfHistory = await pdfHistoryModel.findOneAndUpdate(
  { pdfId: pdfId, userId: req.user._id },
  {
    $set: {
      totalQuestionsAttempted: totalQuestions,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
      score: score,
    },
    $setOnInsert: {
      userId: req.user._id,
      pdfId: pdfId
    }
  },
  { new: true, upsert: true }
);

    if (!pdfHistory) {
      return res.status(404).json({ message: 'PDF history not found' });
    }

    // --- Update Dashboard ---
    const dashboard = await pdfDashboardModel.findOneAndUpdate(
      { userId: req.user._id },
      {
        $inc: {
          "pdfAttempted.number": 1,
          "totalQuestionAttempted.number": totalQuestions,
          "totalQuestionCorrect.number": correctAnswers,
          "wrong.number": wrongAnswers,
        }
      },
      { new: true }
    );

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard not found' });
    }

    // --- Update Accuracy ---
    const attempted = dashboard.totalQuestionAttempted.number;
    const correct = dashboard.totalQuestionCorrect.number;

    const newAccuracy = attempted > 0 ? (correct / attempted) * 100 : 0;

    const newdashboard = await pdfDashboardModel.findOneAndUpdate(
      { userId: req.user._id },
      { "accuracy.number": newAccuracy },
      { new: true }
    );

    if (!newdashboard) {
      return res.status(404).json({ message: 'Dashboard accuracy not updated' });
    }

    // --- Final Response ---
    res.status(200).json({
      message: 'User answers updated successfully',
      userAnswers,
      pdfHistory,
      dashboard: newdashboard
    });

  } catch (error) {
    console.error('Error updating user answers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

