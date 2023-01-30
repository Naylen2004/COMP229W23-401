const connect = require('connect');
const app = connect();

// logger middleware 
function logger(req, res, next) {
    // req.method is get , req.url is the forward slash
    console.log(req.method,req.url);  // what we receive from the broweser
    next();  // moves to next middleware
}

function goodbyeWorld(req, res, next) {
    res.setHeader('Content-Type','text/html');  //  
    res.end('GoodBye World')
}

function helloWorld(req,res,next) {
    res.setHeader('Content-Type','text/html')
    res.end('Hello World');  // ends request 
}
app.use(logger); // always call logger
app.use('/hello',helloWorld); // if pass hello, call respond with helloWorld function
app.use('/goodbye',goodbyeWorld);
app.listen(3000);
console.log('Sever running at http://localhost:3000');