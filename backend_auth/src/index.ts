import express, {NextFunction,  Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT);

const users = []
const products = []
const purchases = []

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            message: 'Hello World'
        });
    } catch (err) {
        next(err);
    }
});

app.get('/products', (_req: Request, res: Response, next: NextFunction) => {
    res.status(201).json(products);

});

app.post('/products', (_req: Request, res: Response, next: NextFunction) => {
    const {title, content} = _req.body;
    products.push({
        id: products.length + 1,
        title: title ? title : `product${products.length + 1}`,
        content: content ? content : `content${products.length + 1}`,
    })
    res.status(201).json(products);
});


app.put('/products/:id', (_req: Request, res: Response, next: NextFunction) => {
    const {title, content} = _req.body;
    const {id} = _req.params;
    const product = products.find((product) => product.id.toString() === id);
    if (!product) {
        res.status(400).json({message: 'Product not found'});
        return;
    }
    products.splice(products.indexOf(product), 1);
    products.push({
        id,
        title: title ? title : product.title +  " updated",
        content: content ? content : product.content + " updated",
    })
    res.status(201).json(products);
});


app.delete('/products/:id', (_req: Request, res: Response, next: NextFunction) => {
    const {id} = _req.params;
    const product = products.find((product) => product.id.toString() === id);
    if (!product) {
        res.status(400).json({message: 'Product not found'});
        return;
    }
    products.splice(products.indexOf(product), 1);
    res.status(200).json(products);
});

app.post('/purchases', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = _req.body;
        if (!id) {
            throw new Error('id is required');
        }

        const product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error('Product not found');
        }

        purchases.push({
            id: purchases.length + 1,
            article: product,
            status: "processing"
        });

        res.status(201).json({message: 'Product purchased successfully', purchases});
    } catch (e) {
        next(e);
    }
});

app.get('/purchases', (_req: Request, res: Response, next: NextFunction) => {
   res.status(201).json(purchases);
});


app.post('/users', (_req: Request, res: Response, next: NextFunction) => {
    users.push({
        id: users.length + 1,
        name: `user${users.length + 1}`,
    })
    res.json(users);
});
