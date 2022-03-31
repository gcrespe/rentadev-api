const Denounce = require('../models/denounce')
const request = require('request');
const { v4: uuidv4 } = require('uuid');
const { commentary } = require('../models/denounce')

class DenounceController {

    static async registerDenounce(req, res){
        let body = req.body;

		let denounce = new Denounce();

        denounce.denounceId = uuidv4()
        denounce.userEmail = body.userEmail
        denounce.cep = body.cep
        denounce.street = body.street
        denounce.number = body.number
        denounce.complement = body.complement
        denounce.district = body.district
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
    }

    static async removeDenounce(req, res){
        let body = req.body;

        Denounce.findOneAndRemove({denouceId: body.denounceId})

        return res.status(200).json({
			success: true,
			message: 'The following denounce has been removed',
			payload: body.denounceId
		});

    }

    static async approveUnapproveDenounce(req, res){
        let body = req.body;

        Denounce.findOneAndUpdate(
            {denouceId: body.denounceId},
            {status: body.status}
        )

        return res.status(200).json({
			success: true,
			message: 'The following denounce has been updated',
			payload: [body.denounceId]
		});

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

        await Denounce.findOneAndUpdate({denounceId: body.denounceId},
            {
            "$push": {
                commentaries: body.commentary
            }
            }, {
                new: true //to return updated document
            })
            .exec(function(error, denounce) {
                if (error) {
                    return res.status(400).send({message: 'Failed to add comment due to invalid params!'});
                }
                    return res.status(200).send(denounce);
            });

    }

}

module.exports = DenounceController