import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import issueRouts from "./routes/issue.js";

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zselq.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
const server = express();

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.use(bodyParser.json());
server.use('/issue', issueRouts);

mongoose.connect(MONGODB_URI)
    .then(() => {
        server.listen(8080);
    })
    .catch(err => console.log(err));