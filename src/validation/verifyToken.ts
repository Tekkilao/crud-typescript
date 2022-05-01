
import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, '3')
        return {payload: decoded, expired: false}
    } catch(error: any) {
        return {payload: null, expired: error.message.include('jwt expired')}

    }
}