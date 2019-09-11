var express = require('express')
var app = express()

app.use(express.static(__dirname))

var messages = [
    {
        name : "Mohsen",
        message : "Hi"
    },
    {
        name : "Mohammad",
        message : "Hello"
    }];


app.get("/messages", (req, res) =>{
    messages[0].name = req.query.name;
    res.send(messages)
})

var server = app.listen(3000, () => {
    console.log("Listen on port", server.address().port);
})