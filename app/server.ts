
import * as path from 'path';
import * as express from 'express';
import {Express} from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import * as config from '../config';
import {Routes} from './http/Routes';


let app: Express = express();

app.set('port', config.http.port);
app.set('views', path.join(__dirname, 'http', 'views'));
app.set('view engine', 'ejs');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '..', 'public')));

if(app.get('env') === 'development') {

    const webpack = require('webpack');
    const wpDev = require('webpack-dev-middleware');
    const wpHot = require('webpack-hot-middleware');
    const wpConfig = require('../webpack.config');

    let compiler = webpack(wpConfig);

    app.use(wpDev(compiler, {
        noInfo: true,
        publicPath: wpConfig.output.publicPath
    }));

    app.use(wpHot(compiler));

}

app.use('/', Routes);

app.use((req, res, next) => {
    let err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err: any, req, res, next) => {

    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.status);
    res.render('error', {
        status: err.status,
        message: err.message,
        stack: app.get('env') === 'development' ? err.stack : ''
    });

});

let server = app.listen(config.http.port);

server.on('listening', () => {
    console.log(`\x1b[32mServer listening on port ${config.http.port}\x1b[0m`);

    // //Init mongoose connection
    // require('./api/db/db.js');
    //
    // //Http listening hook
    // require('./api/http/listening')();

});

server.on('error', (err: any) => {

    if(err.syscall !== 'listen') {
        throw err;
    }

    switch(err.code) {
        case 'EACCES':
            console.error(`Port ${config.http.port} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`Port ${config.http.port} is already in use`);
            process.exit(1);
            break;
        default:
            throw err;
    }

});
