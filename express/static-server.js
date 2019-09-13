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

var dbUrl = "mongodb+srv://user:user@cluster0-behpm.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log('mongo db connection', err);
})

var Message = mongoose.model("Message", {
    name: String,
    message: String
})

app.get("/messages", (req, res) => {
    messages[0].name = req.query.name;
    res.send(messages)
})

app.post("/messages", (req, res) => {
    // messages.push(req.body)
    // res.sendStatus(200)
    // console.log("ok");

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

var server = app.listen(3000, () => {
    console.log("Listen on port", server.address().port);
})