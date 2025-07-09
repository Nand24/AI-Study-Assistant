const userModel = require('../model/user.Model');
const jwt = require('jsonwebtoken');

module.exports.isLogIn = async (req, res , next ) => {

    const token = req.cookie?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({_id: decoded.id}).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        req.user = user;
        next();
        
    } catch(error){
        console.error('Error during token verification:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}