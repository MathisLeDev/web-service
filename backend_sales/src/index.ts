import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import "./utils/rabbitmqConsumer";

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT

// Start the server at port
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}`);


// Serve the GraphiQL IDE.
app.get('/', (_req:any, res:any) => {
    res.send({message: "Hello World"});
});