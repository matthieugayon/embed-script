'use strict';

import config from './gulp/config';
import http from 'http';
import express from 'express';
import gutil from 'gulp-util';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

let server = express();

// log all requests to the console
server.set('port', (process.env.PORT || config.serverPort));
server.use(morgan('dev'));
server.use(express.static(process.env.PWD + '/build'));

// Start webserver if not already running
var s = http.createServer(server);
s.on('error', function(err){
    if(err.code === 'EADDRINUSE'){
        gutil.log('Development server is already started at port ' + config.serverPort);
    }
    else {
        throw err;
    }
});

s.listen(server.get('port'));

export default server;