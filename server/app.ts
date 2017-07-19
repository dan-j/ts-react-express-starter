import express, { Request, Response } from 'express';
import path from 'path';
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/')));

app.get('/greet', (req: Request, res: Response) => {
    res.send('Hello from express!');
});

app.listen(8080, () => console.log('App listening on port 8080'));
