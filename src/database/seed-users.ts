import * as bcrypt from 'bcrypt'
import mongoose, { Model } from "mongoose";
import { User, UserSchema } from '../modules/users/user.schema';
import * as dotenv from 'dotenv'
import { connectToDatabase, closeDatabaseConnection } from './seed.utils';

dotenv.config();

async function seedUsers(){
    const MONGO_URI = process.env.MONGO_URI!;

    await connectToDatabase(MONGO_URI);

    try{
        const UserModel : Model<User> = mongoose.model(User.name, UserSchema);

        await UserModel.deleteMany({});
        console.log("Cleared Existing Data");

        const users = [
            {
                username: "admin",
                password: await bcrypt.hash("AdminPass123", 10),
                role: "admin",
                email: "admin@example.com",
                firstName : "John",
                lastName : "Doe",
                phoneNumber : "95456456",
                adress : "New York City",
                birthDate : new Date(2002, 6, 3)
            },
            {
                username: "client",
                password: await bcrypt.hash("ClientPass123", 10),
                role: "client",
                email: "client@example.com",
                firstName : "Patrick",
                lastName : "Hamilton",
                phoneNumber : "55654879",
                adress : "Jandouba",
                birthDate : new Date(2001, 0, 29)
            },
        ] 
        await UserModel.insertMany(users);
        console.log("Seeded Users : ", users.map(user => user.username));
    }catch(error){
        console.error("Error seeding users:", error);
    }finally{
        closeDatabaseConnection();
    }
}

seedUsers();