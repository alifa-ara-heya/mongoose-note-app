import 'dotenv/config'
import mongoose from "mongoose";
import { Server } from 'http';
import app from "./app";

let server: Server;
const port = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.db_username}:${process.env.db_pass}@cluster0.kvlax.mongodb.net/mongooseNoteDB?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Connected to MongoDB using Mongoose');

        server = app.listen(port, () => {
            console.log(`My awesome app is listening on port, ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();