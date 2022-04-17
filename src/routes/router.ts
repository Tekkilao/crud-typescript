import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

//create

router.post('/users', UserController.create);

//read

router.get('/users', UserController.findAll);

router.get('/users/:userId', UserController.findOne);

//update

router.put('/users/:userId', UserController.update);


//delete

router.delete('/users/:userId', UserController.destroy);

export {router};
