const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function(req, res) {
    const pathName = req.url

    let htmlFile = '';
    switch (pathName) {
        case '/':
            htmlFile = 'index.html'
            break;
        case '/about':
            htmlFile = 'about.html'
            break;
        case '/contact':
            htmlFile = 'contact.html'
            break;
        case '/home':
            htmlFile = 'index.html'
            break;
        default:
            break;
    }

    if (htmlFile) {
        render(res, htmlFile)
    }
    
    // if (pathName === '/' || pathName === '/home') {
    //     res.end('This is the home pagge')
    // } else if (pathName === '/about') {
    //     res.end('This is the about page')
    // } else if (pathName === '/contact') {
    //     res.end('This is the contact page')
    // } else {
    //     res.end('Page not Found')
    // }
    
})

function render(res, htmlFile) {
    fs.stat(`./${htmlFile}`, (err, stat) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        if (stat) {
            fs.createReadStream(htmlFile).pipe(res)
        } else {
            res.statusCode = 404
            res.end("Page not found")
        }
    })
}

server.listen(3000, '127.0.0.1', () => {
    console.log('Server started successfully');
});

