require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const secret = process.env.SECRET
const port = process.env.PORT

var app = express();
app.use(bodyParser.json())

app.get('/verify', (req, res) => {
    jwt.verify(req.query.token, secret, function (err, payload) {
        var isValid = false
        if (!err) {
            isValid = true
        }
        res.json({
            token: req.query.token,
            valid: isValid,
            payload: payload
        })
    })
})

app.get('/generate', (req, res) => {
    var token = jwt.sign({ userId: req.query.email }, secret, { expiresIn: '1h' })
    res.json({
        token: token
    })
})


app.get('/', (req, res) => {
    res.send({ alive: true })
})

app.listen(port, () => {
    console.log('auth listening on port=' + port)
})