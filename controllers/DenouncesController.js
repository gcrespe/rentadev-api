const Denounce = require('../models/denounce')
const { v4: uuidv4 } = require('uuid');

class DenounceController {

    static async registerDenounce(req, res){
        let body = req.body;

		let denounce = new Denounce();

        denounce.denounceId = uuidv4()
        denounce.userEmail = body.userEmail
        denounce.cep = body.cep
        denounce.street = body.street
        denounce.number = body.numer
        denounce.complement = body.complement
        denounce.district = body.district
        denounce.description = body.description
        denounce.images = body.images
        denounce.videos = body.videos
        denounce.date = body.date
        denounce.status = body.status
        denounce.commentaries = body.commentaries

        await denounce.save();

        return res.status(200).json({
			success: true,
			message: 'Success',
			payload: [denounce]
		});
    }

    static async removeDenounce(req, res){
        let body = req.body;

        let denounce = Denounce.findOne({denouceId: body.denounceId})

        await Denounce.findOneAndRemove({denouceId: body.denounceId})

        return res.status(200).json({
			success: true,
			message: 'The following denounce has been removed',
			payload: [denounce]
		});

    }

    static async approveUnapproveDenounce(req, res){
        let body = req.body;

        Denounce.findOneAndUpdate(
            {denouceId: body.denounceId},
            {status: body.status}
        )

        let denounce = Denounce.findOne({denounceId: body.denounceId})

        return res.status(200).json({
			success: true,
			message: 'The following denounce has been updated',
			payload: [denounce]
		});

    }

    static async getDenounceHistory(req, res){
        let body = req.body;

        let denounceList = Denouce.find()
    }

    static async searchDenounceByLocation(){}

    static async addComentaryToDenounce(){}

}

module.exports = DenounceController