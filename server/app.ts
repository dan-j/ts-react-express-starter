import express, { Request, Response } from 'express';
import path from 'path';

import devMiddleware from './middlewares/dev';

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(devMiddleware());
} else {
    app.use(express.static(path.resolve(__dirname, '../client/')));
}

app.get('/greet', (req: Request, res: Response) => {
    res.send('Hello from express!');
});

export default app;
