const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength:[5,"Username must be at least 5 characters long"],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlength:[5,"Email must be at least 5 characters long"],
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,"Password must be at least 8 characters long"],
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
    updatedAt:{
        type:Date,
        default: Date.now,
    }
},
{
    timestamps: true,
}
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
