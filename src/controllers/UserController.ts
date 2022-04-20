import {Request, Response} from 'express';
import { UserModel } from '../database/models/UserModel';
import {registerValidation} from '../validation/validation';

class UserController {

    async findAll(req: Request, res: Response) {
        const users = await UserModel.findAll();

        return users.length > 0 ? res.status(200).json(users) : res.status(204).send();

    };

    async findOne(req: Request, res: Response) {
        const {userId} = req.params;
        const user = await UserModel.findOne({
            where:{id: userId}
        });
        return user ? res.status(200).json(user) : res.status(204).send();

    };

    async create(req: Request, res: Response) {
        const {name, email, password, password2} = req.body;
        let {error} = registerValidation(req.body)

        let errors: any[] = [];
        if (error) {
            errors.push({text: error.details[0].message});
        };

        const emailExist = await UserModel.findOne({where: {email: email}})

        if (emailExist) {
            errors.push({text: 'This email is already in use'});
        }

        if (password != password2) {
            errors.push({text: "The passwords doesn't match"}); 
        }
        

        if (errors.length > 0) {
            res.render('register', {
            errors,
            name, 
            email})
            //to do: hashed passwords + rewrite the errors code with flashmessages or something else
        } else {
            await UserModel.create({
                name: name,
                email: email,
                password: password,
            })
            .then(() => {
                res.redirect('/')
            }).catch(err => console.log(err));
        
    }
    };

    async update(req: Request, res: Response) {
        const {userId} = req.params
        //const {name, email, age} = req.body;
        await UserModel.update(req.body, {where: {id: userId}})

        return res.status(204).send();

    };

    async destroy(req: Request, res: Response) {
        const {userId} = req.params
        await UserModel.destroy({where: {id: userId}});
        return res.status(204).send();
    }
}



export default new UserController();  