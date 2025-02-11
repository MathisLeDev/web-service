import {buildSchema} from 'graphql';
import {createHandler} from 'graphql-http/lib/use/express';
import express from 'express';
const { ruruHTML } = require('ruru/server');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`type Query { hello: String } `);

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
    hello() {
        return 'Hello world!';
    },
};

const app = express();

// Create and use the GraphQL handler.
app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: rootValue,
    }),
);

// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');


// Serve the GraphiQL IDE.
app.get('/', (_req:any, res:any) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});