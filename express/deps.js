module.exports = {
    initStaticServer: function  () {
        var express = require('express')
        var bodyParser = require('body-parser')
        var app = express()
        var mongoose = require('mongoose')

        app.use(express.static(__dirname))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        return app
    },

    initSocketServer: function () {
        var express = require('express')
        var bodyParser = require('body-parser')
        var app = express()
        var http = require('http').Server(app)
        var io = require('socket.io')(http)

        app.use(express.static(__dirname))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        return http
    }
}
