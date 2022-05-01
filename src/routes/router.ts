import express from 'express';
import UserController from '../controllers/UserController';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')})

//create
router.get('/register', (req, res) => res.render('register'))
router.post('/register', UserController.create);

//login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', UserController.login);

//dashboard
router.get('/dashboard', UserController.dashboard)
//read


router.get('/users', UserController.findAll);

router.get('/users/:userId', UserController.findOne);

//update

router.put('/users/:userId', UserController.update);


//delete

router.delete('/users/:userId', UserController.destroy);

export {router};
