var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {
        name: "Mohsen",
        message: "Hi"
    },
    {
        name: "Mohammad",
        message: "Hello"
    }];


app.get("/messages", (req, res) => {
    messages[0].name = req.query.name;
    res.send(messages)
})

app.post("/messages", (req, res) => {
    messages.push(req.body)
    res.sendStatus(200)
    console.log("ok");
    
})

var server = app.listen(3000, () => {
    console.log("Listen on port", server.address().port);
})