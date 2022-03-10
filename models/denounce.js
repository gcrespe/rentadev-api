//Require Mongoose
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentary = {
    commentaryId: {type : String},
    date: {type : String},
    content: {type : String}
}

var DenounceModel = new Schema({
    denounceId: {type : String},
    userEmail: {type : String},
    cep: {type : String},
    street: {type : String},
    number: {type : String},
    complement: {type : String},
    district: {type : String},
    description: {type : String},
    images: {type : [String]},
    videos: {type : [String]},
    date: {type : String},
    status: {type: String, default: 'PENDENTE'},
    commentaries: {type: [commentary]}
},
{ versionKey: false }
);

//Export function to create "UsersModel" model class
module.exports = mongoose.model('Denounce', DenounceModel )