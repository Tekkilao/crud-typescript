import {Request, Response} from 'express';
import { UserModel } from '../database/models/UserModel';
import {loginValidation, registerValidation} from '../validation/validation';
import bcrypt from 'bcrypt';

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
            res.status(406)
            res.render('register', {
            errors,
            name, 
            email})
            //to do: hashed passwords + rewrite the errors code with flashmessages or something else
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);;
            await UserModel.create({
                name: name,
                email: email,
                password: hashedPassword,
            })
            
            .then(() => {
                res.status(201)
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

    async login(req: Request, res: Response) {
        let {email, password} = req.body;
        let {error} = loginValidation(req.body)
        let errors: any[] = [];

        if (error) {
            errors.push({text: error.details[0].message})
        }
        
        const user: any = await UserModel.findOne({where: {email: email} });

        if (!user) {
            errors.push({text: "This email doesn't exist"})
            res.status(406)
            res.render('login',{
            errors,
            email
        })
        } else {
       const userPassword = user.password
       const validPassword = await bcrypt.compare(password, userPassword)
        
        
        if (!validPassword) {
            errors.push({text: "Invalid password"})
        };
        
        if (errors.length > 0 ) {
            res.render('login', {
           errors, 
           email
       })
       } else {
           res.status(200)
           res.redirect('/dashboard')
           
       }

    }
}
}



export default new UserController();  