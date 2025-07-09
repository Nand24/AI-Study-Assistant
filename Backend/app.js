const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./config/mongoose.connection');
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes');
const aiRoutes = require('./routes/ai.routes');

app.use('/user',userRoutes);
app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express.js application!');
})

module.exports = app;