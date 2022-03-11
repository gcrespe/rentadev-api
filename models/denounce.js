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
    images: {type : [String], default: null},
    videos: {type : [String], default: null},
    date: {type : String},
    status: {type: String, default: 'PENDENTE'},
    commentaries: {type: [commentary], default: null}
},
    { versionKey: false }
);

//Export function to create "UsersModel" model class
module.exports = mongoose.model('Denounce', DenounceModel )