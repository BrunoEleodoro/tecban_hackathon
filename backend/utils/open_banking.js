const request = require('request')
const fs = require('fs')
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '.env') })


let basicB64 = process.env.BASE64;

function getAccessToken() {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicB64}`
            },
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
            form: {
                'grant_type': 'client_credentials',
                'scope': 'accounts openid'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            let contents = JSON.parse(response.body);
            resolve(contents)
        });
    })
}

function generateConsentId(access_token) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents',
            'headers': {
                'Content-Type': 'application/json',
                'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
                'x-fapi-interaction-id': '98c87f60-38d0-433e-83c4-0e6b9ac978ca',
                'Authorization': `Bearer ${access_token}`
            },
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
            body: JSON.stringify({ "Data": { "Permissions": ["ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances", "ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadDirectDebits", "ReadTransactionsBasic", "ReadTransactionsCredits", "ReadTransactionsDebits", "ReadTransactionsDetail", "ReadProducts", "ReadStandingOrdersDetail", "ReadProducts", "ReadStandingOrdersDetail", "ReadStatementsDetail", "ReadParty", "ReadOffers", "ReadScheduledPaymentsBasic", "ReadScheduledPaymentsDetail", "ReadPartyPSU"] }, "Risk": {} })

        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            let contents = JSON.parse(response.body);
            resolve(contents)

        });
    })
}

function getConsentURL(consentId) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `https://rs2.tecban-sandbox.o3bank.co.uk/ozone/v1.0/auth-code-url/${consentId}?scope=accounts&alg=none`,
            'headers': {
                'Authorization': `Basic ${basicB64}`
            },
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            resolve(response.body)
        });
    })
}

function functionalToken(code) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicB64}`
            },
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
            form: {
                'grant_type': 'authorization_code',
                'scope': 'accounts ',
                'code': `${code}`,
                'redirect_uri': 'http://localhost:3000/consentimento'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            let contents = JSON.parse(response.body)
            resolve(contents)
        });
    })
}

function getBasicInformation(token) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/party',
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
            'headers': {
                'Content-Type': 'application/json',
                'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
                'x-fapi-interaction-id': '625705ec-abd8-450f-88aa-d70f56274510',
                'Authorization': `Bearer ${token}`
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            let contents = JSON.parse(response.body);
            resolve(contents)
        });
    })
}

function getBalance(token) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/balances',
            cert: fs.readFileSync(path.resolve(__dirname, 'certs/client_certificate.crt')),
            key: fs.readFileSync(path.resolve(__dirname, 'certs/client_private_key.key')),
            rejectUnauthorized: false,
            'headers': {
                'Content-Type': 'application/json',
                'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
                'x-fapi-interaction-id': 'e5185f13-7436-494e-9e4c-7f32c54f7c38',
                'Authorization': `Bearer ${token}`
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
            let contents = JSON.parse(response.body);
            resolve(contents)
        });
    })
}


module.exports = {
    getAccessToken: getAccessToken,
    generateConsentId: generateConsentId,
    getConsentURL: getConsentURL,
    functionalToken: functionalToken,
    getBasicInformation: getBasicInformation,
    getBalance: getBalance
}