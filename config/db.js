const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config();
const mongoURI = process.env.MongoURI;
const connectToMongo = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log('Connected to mongoose')
    } catch(error){
        console.log(error)
    }
}
module.exports = connectToMongo;