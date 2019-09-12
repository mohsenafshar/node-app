var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var messages = [
    {
        name: "Mohsen",
        message: "Hi"
    },
    {
        name: "Mohammad",
        message: "Hello"
    }
];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/socket.html');
});

app.post("/messages", (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
    console.log("ok");
    io.emit('message', req.body)    
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    });
});

var server = http.listen(3000, () => {
    console.log("Listen on port", server.address().port);
})