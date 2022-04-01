const Users = require('../models/user')

class UsersController {

    static async login(req, res) {

        let body = req.body;
        console.log("CHEGOU", );
        let user;

        try{
            user = await Users.findOne({
                email : body.email
            });

            console.log("CHEGOU 2", user.senha, body.senha);

    
            if(user == null){
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    payload: []
                });
            }
    
            // if(user['senha'] == body.senha){
                return res.status(200).json({
                    success: true,
                    message: 'Success',
                    payload: [user]
                });
            // }
            //else{
            //     return res.status(403).json({
            //         success: false,
            //         message: 'Password not match',
            //         payload: []
            //     });
            // }
        }catch(e){
            return res.status(400).send({message: 'Houve um erro na chamada do serviço'});
        }
        
    }


    static async register(req, res){

        let body = req.body;

        let user = new Users();

        try {
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
        }catch(e){
            return res.status(400).send({message: 'Houve um erro na chamada do serviço'});
        }
    }

}

module.exports = UsersController;