import {buildSchema} from 'graphql';
import {createHandler} from 'graphql-http/lib/use/express';
import express from 'express';
import {ArticleResolvers} from "./resolvers/article.resolver";
import {WebServiceDataSource} from "./data_source/data_source";
import {ArticleDto} from "./dtos/article.dto";
const { ruruHTML } = require('ruru/server');
import cors from 'cors';
import {PurchaseResolvers} from "./resolvers/payment.resolver";
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Article {
        id: Int
        title: String
        content: String
    }
    
    type Payment {
        id: Int
        user_name: String
        article_id: Int
        status: String
    }
    
    type Query {
        getArticles: [Article]
        getArticleById(id: Int): Article
    }
    
    type Mutation {
        createArticle(article: ArticleDto): Article
        updateArticle(id: Int, article: ArticleDto): Article
        deleteArticle(id: Int): Article
        purchaseArticle(payment: PaymentDto): Payment
    }

    input ArticleDto {
        id: Int
        title: String
        content: String
    }
    
    input PaymentDto {
        user_name: String
        article_id: Int
    }
    
    
`);


WebServiceDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


const articleResolvers  = new ArticleResolvers()
const purchaseResolvers = new PurchaseResolvers()

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
    getArticles: articleResolvers.getArticles.bind(articleResolvers),
    getArticleById: articleResolvers.getArticleById.bind(articleResolvers),
    createArticle: articleResolvers.createArticle.bind(articleResolvers),
    updateArticle: articleResolvers.updateArticle.bind(articleResolvers),
    deleteArticle: articleResolvers.deleteArticle.bind(articleResolvers),
    purchaseArticle: purchaseResolvers.purchaseArticle.bind(purchaseResolvers)
};
const app = express();

app.use(cors());


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