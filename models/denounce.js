//Require Mongoose
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentary = {
    commentaryId: {type : String},
    date: {type : Date},
    content: {type : String}
}

var DenounceModel = new Schema({
    denounceId: {type : String},
    userEmail: {type : String},
    cep: {type : String},
    lat: {type : String},
    lng: {type : String},
    street: {type : String},
    number: {type : String},
    complement: {type : String},
    district: {type : String},
    description: {type : String},
    images: {type : [String], default: null},
    videos: {type : [String], default: null},
    date: {type : Date},
    status: {type: String, default: 'PENDENTE'},
    commentaries: {type: [Object], default: null}
},
    { versionKey: false }
);

//Export function to create "DenounceModel" model class
module.exports = mongoose.model('Denounce', DenounceModel )