import core from 'express-serve-static-core';
import express from 'express';
import path from 'path';

import devMiddleware from './middlewares/dev';

const app = express();

if (process.env.NODE_ENV === 'development') {

    app.use(devMiddleware());

} else {

    app.use(express.static(path.resolve('dist/client/')));

}

function forceRequireRoutes(req: core.Request, res: core.Response, next: core.NextFunction) {

    require('./routes')(req, res, next);

}

app.use(forceRequireRoutes);

export default app;
