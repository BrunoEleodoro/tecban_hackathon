var request = require('request')

module.exports = {
    protectedRoute: protectedRoute,
    basicAuthRoute: basicAuthRoute
}

function protectedRoute(req, res, next) {
    var token = req.headers.authorization
    try {
        token = token.split(' ')
        token = token[1]
        request.get('http://arvore-auth:5001/verify?token=' + token, (error, response, body) => {
            if (error) {
                res.status(403).send({ status: 403, valid: false })
            } else if (JSON.parse(body).valid != undefined && JSON.parse(body).valid == false) {
                res.status(403).send({ status: 403, valid: false })
            } else {
                req.body.userId = JSON.parse(body).payload.userId
                next();
            }
        });
    } catch (ex) {
        res.status(403).send({ status: 403, valid: false })
    }

}

function basicAuthRoute(req, res, next) {
    var token = req.headers.authorization
    if (token == "898112366be32651f2a88188cf4986ed879328f98cf72ea30a86b28ea431775427bc59653644ab75") {
        next();
    } else {
        res.status(403).send({ status: 403, valid: false })
    }
}

