import mongoose from "mongoose";

export async function connect(){ 
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection

        connection.on('connected', () => {
        console.log('Mongodb connected');
    })

    connection.on('error', (err) => {
      console.log("Mongodb connection error,please make sure db is up and running+"+err);
      process.exit()
      
  })
    }catch(error){
        console.log('something went wrong in connecting  to the db');
        console.log(error);
    }
}