module.exports = {
    initStaticServer: function () {
        var express = require('express')
        var bodyParser = require('body-parser')
        var app = express()

        app.use(express.static(__dirname))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        return app
    },

    initSocketServer: function () {
        var express = require('express')
        var bodyParser = require('body-parser')
        var app = express()

        app.use(express.static(__dirname))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        return app
    }
}