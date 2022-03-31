const Users = require('../models/user')

class UsersController {

    static async login(req, res) {
        let body = req.body;

        let user = await Users.findOne({
            email : body.email
        });

        if(user == null){
            return res.status(404).json({
                success: false,
                message: 'User not found',
                payload: []
            });
        }

        if(user.password == body.senha){
            return res.status(200).json({
                success: true,
                message: 'Success',
                payload: [user]
            });
        }else{
            return res.status(403).json({
                success: false,
                message: 'Password not match',
                payload: []
            });
        }
    }


    static async register(req, res){
        let body = req.body;

        let user = new Users();

        user.email = body.email
        user.name = body.name
        user.password = body.password
        user.userType = body.userType

        await user.save();

        return res.status(200).json({
			success: true,
			message: 'Success',
			payload: [user]
		});
    }

}

module.exports = UsersController;