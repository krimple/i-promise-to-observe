const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use(jsonServer.bodyParser);
server.post('/validate-description', (req, res) => {
    const payload = req.body;
    console.log('incoming request - ', JSON.stringify(payload));
    setTimeout(() => {
        const answer = req.body;
        if (payload.description.match(/poison/)) {
            console.log('invalid description in request - ', JSON.stringify(payload));
            res.send({ valid: false });
        } else {
            console.log('valid description in request - ', JSON.stringify(payload));
            res.send({ valid: true });
        }
    }, 500);
});

server.use(router);
let hostname = 'localhost';
if (process.argv.length === 3) {
  hostname = process.argv[2];
}
server.listen(9090, hostname, () => {
  console.log('JSON Server is running')
});
