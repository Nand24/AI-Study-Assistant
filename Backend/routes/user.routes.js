const express =  require('express');
const router = express.Router();
const {body} = require('express-validator');
const { isLogIn } = require('../middleware/isLogin');
const {
  registerUser,
  loginUser,
  logoutUser,
  getuserProfile,
  getDashboard,
  pdfHistory,
  pdfStudyData,
  getUserAnswer,
  updateUserAnswer, 
  getPdfList,
  verifyToken
} = require('../controller/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('username').isLength({min:3}).withMessage('username must be 3 character long'),
    body('password').isLength({min:8}).withMessage('password must be at least 8 character long')
],registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:8}).withMessage('password must be at least 8 character long')
],loginUser);

router.get('/logout',logoutUser);

router.get('/api/verifyToken' , verifyToken);

router.get('/getUserProfile' , isLogIn , getuserProfile);

router.get('/getDashboard' , isLogIn , getDashboard);

router.get('/PdfList', isLogIn , getPdfList);

router.get('/pdfHistory/:pdfId' , isLogIn , pdfHistory);

router.get('/getPdfStudyData/:pdfId' , isLogIn , pdfStudyData);

router.get('/getUserAnswer/:pdfId' , isLogIn , getUserAnswer);

router.patch('/updateuserAnswer', isLogIn , updateUserAnswer);

module.exports = router;