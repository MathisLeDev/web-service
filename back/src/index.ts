import express, { Request, Response } from "express";
import dotenv from "dotenv";

// configures dotenv to work in your application
dotenv.config();
const index = express();

const PORT = process.env.PORT;

index.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

index.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});