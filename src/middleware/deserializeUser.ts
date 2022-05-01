import {Request, Response, NextFunction} from 'express';
import { verifyToken } from '../validation/verifyToken';

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.cookies;


    if (!token) {
        return next()
    } else {
        const {payload} = verifyToken(token)
        if (payload) {
            //@ts-ignore
            req.user = payload;
            return next()
        } else {
            return next();
        }
    }

}


export default deserializeUser