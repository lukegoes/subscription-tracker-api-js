import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
    throw new Error('Por favor defina a variável MONGODB_URI no arquivo .env.development/production.local');
}

const connectToDatabase = async () => {
    try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB Conectado no modo ${NODE_ENV}`);


    } catch (error){
        console.error("Erro conectando ao banco de dados: ", error);
        process.exit(1);
    }
}

export default connectToDatabase;