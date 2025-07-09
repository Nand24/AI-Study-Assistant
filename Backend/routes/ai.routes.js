const express = require('express');
const router = express.Router();
const { uploadPdfAndGenerate } = require('../controller/ai.controller');
const upload = require('../middleware/multer.middleware');
const { isLogIn } = require('../middleware/isLogin');

router.post('/uploadPdfAndGenerate', upload.single('pdf') , isLogIn ,uploadPdfAndGenerate);

module.exports = router;