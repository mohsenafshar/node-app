var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


var dbUrl = "mongodb+srv://user:user@cluster0-behpm.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log('mongo db connection', err);

})

var Message = mongoose.model("Message", {
    name: String,
    message: String
})

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.get("/messages/:user", (req, res) => {
    var user = req.params.user
    Message.find({name : user}, (err, messages) => {
        res.send(messages)
    })
})

app.post("/messages", (req, res) => {

    var msg = new Message(req.body);
    msg.save((err) => {
        if (err) {
            res.sendStatus(500)
        }

        messages.push(req.body)
        res.sendStatus(200)
        io.emit('message', req.body)
    })
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