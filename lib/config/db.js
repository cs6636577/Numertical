import mongoose from 'mongoose';

export const ConnectDB = async() => {
    await mongoose.connect('mongodb+srv://manthana:2qkk2T9de9zqXd9@cluster0.qewhkht.mongodb.net/numer');
    console.log("DB connect");
}
