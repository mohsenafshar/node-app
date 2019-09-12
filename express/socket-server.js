var dep = require('./deps')
var app = dep.initStaticServer()

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