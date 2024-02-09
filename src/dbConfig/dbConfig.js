import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;

        connection.on('connected', ()=> {
            console.log("connected successfully");
        })
        connection.on('error', ()=> {
            console.log("not connected successfully");
        })
    } catch (error) {
        console.log(error);
    }
}