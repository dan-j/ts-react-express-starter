/* eslint-disable import/no-extraneous-dependencies */
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as chokidar from 'chokidar';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import * as path from 'path';
import * as clear from 'clear-require';

import * as webpackConfig from '../../webpack.config';

function setupMiddleware() {
    const compiler = webpack(webpackConfig);
    const devMiddleware: RequestHandler = webpackDevMiddleware(compiler);

    const hotMiddleware: RequestHandler = webpackHotMiddleware(compiler);

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watchPath = path.resolve('server');
    const watcher = chokidar.watch(watchPath);

    watcher.on('ready', () => {
        watcher.on('all', (event, filepath) => {
            clear(filepath);
        });
    });

    const delayMiddleware: RequestHandler = (
        req: Request, res: Response, next: NextFunction,
    ) => setTimeout(next, 1000);

    return [devMiddleware, hotMiddleware, delayMiddleware];
}

export default setupMiddleware;
