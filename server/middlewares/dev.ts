/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import chokidar from 'chokidar';
import chalk from 'chalk';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import path from 'path';

import webpackConfig from '../../webpack.config';

function setupMiddleware() {
    const compiler = webpack(webpackConfig);
    const devMiddleware: RequestHandler = webpackDevMiddleware(compiler);

    const hotMiddleware: RequestHandler = webpackHotMiddleware(compiler);

    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watcher = chokidar.watch('./server');

    watcher.on('ready', () => {
        watcher.on('all', () => {
            const baseRegex = path.resolve(__dirname, '../');
            chalk.bgCyan(`File changed, checking require cache for regex: ${baseRegex}`);
            const regex = new RegExp(baseRegex);

            Object.keys(require.cache).forEach((id) => {
                if (regex.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    });

    const delayMiddleware: RequestHandler = (
        req: Request, res: Response, next: NextFunction,
    ) => setTimeout(next, 1000);

    return [devMiddleware, hotMiddleware, delayMiddleware];
}

export default setupMiddleware;
