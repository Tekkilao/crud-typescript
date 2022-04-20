import {db} from '../db';
import {DataTypes} from 'sequelize'


export const UserModel = db.define('user', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
})