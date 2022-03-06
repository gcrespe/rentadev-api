//Require Mongoose
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersModel = new Schema({
    logintype: {type : Number},
    email: {type : String},
    password: {type : String}
},
{ versionKey: false }
);


//Export function to create "UsersModel" model class
module.exports = mongoose.model('Users', UsersModel )