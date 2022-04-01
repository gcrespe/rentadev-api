const Denounce = require('../models/denounce')
const request = require('request');
const { v4: uuidv4 } = require('uuid');
const { commentary } = require('../models/denounce');
const {
    ObjectId
} = require("mongodb");

class DenounceController {

    static async registerDenounce(req, res){
        let body = req.body;

        console.log(body);

        try{

            let denounce = new Denounce();

            denounce.denounceId = uuidv4()
            denounce.userEmail = body.userEmail
            denounce.cep = body.cep
            denounce.street = body.street
            denounce.number = body.number
            denounce.complement = body.complement
            denounce.district = body.district
            denounce.city = body.city
            denounce.description = body.description
            denounce.images = body.images
            denounce.videos = body.videos
            denounce.date = body.date
            denounce.status = body.status
            denounce.commentaries = body.commentaries

            request(`https://maps.googleapis.com/maps/api/geocode/json?address=${body.cep}&key=AIzaSyCxvTc_3L8Rk8hROFDJYnHr4V7wHaUeTMY`, function (error, response) {
                if (!error && response.statusCode === 200) {
                    let obj = JSON.parse(response.body)
                    denounce.lat = obj.results[0].geometry.location.lat
                    denounce.lng = obj.results[0].geometry.location.lng
                }
            })

            await denounce.save();

            return res.status(200).json({
                success: true,
                message: 'Success',
                payload: [denounce]
            });

        }catch(e){

            return res.status(400).send({message: 'Houve um erro na chamada do serviço'});

        }

    }

    static async removeDenounce(req, res){
        let body = req.body;

        try{

            Denounce.findOneAndRemove({denouceId: body.denounceId})

            return res.status(200).json({
                success: true,
                message: 'The following denounce has been removed',
                payload: body.denounceId
            });

        }catch(e){
            return res.status(400).send({message: 'Houve um erro na chamada do serviço'});
        }

    }

    static async approveUnapproveDenounce(req, res){
        let body = req.body;

        try{
            
            let denounce = await Denounce.findOne({_id: ObjectId(body.denounceId)});

            if(denounce == null) return res.status(400).send({message: 'Failed to add comment due to invalid params!'});
    
            denounce.status = body.status;
            await denounce.save();
                    
            return res.status(200).json({
                success: true,
                message: 'The following denounce has been updated',
                payload: [denounce]
            });

        }catch(e){
            return res.status(400).send({message: 'Houve um erro na chamada do serviço'});
        }

    }

    static async getDenounceHistory(req, res){

        let denounceList = await Denounce.find({})

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});
    }

    static async getDenounceHistoryByUser(req, res){
        let body = req.body

        let denounceList = await Denounce.find({userEmail: body.userEmail})

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});
    }

    static async searchDenounce(req, res){
        let body = req.body;
        let where = {};

        if(body.city) where.city = body.city;
        if(body.start && body.end ) where.date = {$gte: body.start, $lte: body.end};
        if(body.district) where.district = body.district;

        let denounceList = await Denounce.find(where);

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});
    }


    static async searchDenounceByCity(req, res){
        let body = req.body

        let denounceList = await Denounce.find({city: body.city})

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});
    }

    static async searchDenounceByDistrict(req, res){
        let body = req.body

        let denounceList = await Denounce.find({district: body.district})

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});
    }

    static async searchDenounceByDate(req, res){
        let body = req.body

        let denounceList = await Denounce.find({userEmail: body.userEmail, date:{$gte: body.dataInicio, $lte: body.dataFim}}).sort({date: 1})

        return res.status(200).json({
			success: true,
			payload: [denounceList]
		});


    }

    static async addComentaryToDenounce(req, res){
        let body = req.body

        let denounce = await Denounce.findOne({_id: ObjectId(body.denounceId)});

        if(denounce == null) return res.status(400).send({message: 'Failed to add comment due to invalid params!'});

        denounce.commentaries = body.commentary;
        await denounce.save();
                
        return res.status(200).send(denounce);
     
    }

}

module.exports = DenounceController