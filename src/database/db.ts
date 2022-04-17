import { Sequelize } from 'sequelize';


export const db = new Sequelize ('type-script', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'

})