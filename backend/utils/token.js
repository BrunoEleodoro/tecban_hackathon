var request = require('request')

module.exports = {
    generateToken: generateToken
}

function generateToken(email) {
    return new Promise((resolve, reject) => {
        request.get('http://cobertura-auth:5001/generate?email=' + email, (error, response, body) => {
            if (error) {
                console.log('error', error);
                reject(false);
            } else {
                resolve(JSON.parse(body))
            }
        });
    })

}
