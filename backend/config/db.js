import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize (
    'ArgueArena', //database
    'postgres', //username
    'root' //password
, {
    host : 'localhost',
    dialect : 'postgres'
});

export const connection = async() => {
    try{
        await sequelize.sync({alter:true});
        console.log("Database connection successful");
    }
    catch(e){
        console.log("Database connection error",e);
    }
}