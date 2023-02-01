import debug from 'debug';
debug('commp-229');

import http from 'http';
// import the app
import app from './app/app.js';  //have to include the extension ".js"

const PORT = normilizePort(process.env.PORT || 3000);  // passes port info 
app.set('port',PORT);

const server = http.createServer(app);

server.listen(PORT);
server.on('error',onError);
server.on('listening', onListening);

// HELPER FUNCTIONS 
function normilizePort(val) {
    let port = parseInt(val, 10); // 2nd part is based 10
    if(isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}
function onError() {
    if(error.syscall !== 'listen') {
        throw error;
    }
    //teriniary if statemtn 
    // bind is checking if we have a Pipe or Port, Pipe is a string, port is a number 
    let bind = typeof port === 'string'
        ? 'Pipe ' + port   // true statemetn 
        : 'Port ' + port;  // false statement 
    switch (error.code){
        case 'EACESS':
            console.error(bind + ' requires elevated priviledges');
            process.exit(1);
            break;
        case 'EADDINUSE': // hows bind or port is in use
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    } // end switch
} // end function onError()

function onListening() {
    let addr = server.address();
    let bind = 'pipe ' + addr;
    debug('Listening on ' + bind);
    console.log('Listening on ', addr);
}