import request from "request"

class Request {
    // banco: as1
    GetAcessToken(banco, token) {
        return new Promise((resolve, reject) => {
            const options = {
                'method': 'POST',
                'url': 'https://as1.tecban-sandbox.o3bank.co.uk/token',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic YTU5NWIwZDctOGY2YS00ODU5LTgzMjktYTk5MGIxZDM4MzI4OjU4NGZiODhiLTZjN2ItNDY2Zi1hMzcxLTMyZDI5MzA1Yjk3ZA=='
                },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'accounts openid'
                }
            }
            request(options, function (error, response) {
                if (error) {
                    resolve([false, error])
                    return
                }
    
                resolve([true, response.body])
            });
        })
    }
}

export const request = new Request