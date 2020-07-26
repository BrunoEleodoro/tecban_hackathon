## Flow

<!-- SSL Mutuo -->
<!-- Consultar o canal tecnico para exemplos -->

 - Primeira interacao do usuario vai ser "logar com o seu banco" e mostrar os dois bancos cadastrados

 - Backend vai ficar com o certificado 
    - Pedir o token de acesso.

    ```
    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
    },
    form: {
        'grant_type': 'client_credentials',
        'scope': 'accounts openid'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
    ```
    <!-- reminder: one way token, clear after use -->
    response:
    ```
    2db4b921-4841-4058-b273-4471868e70f3
    ```

    Proxima requisicao:

    ```
    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/account-access-consents',
    'headers': {
        'Content-Type': 'application/json',
        'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
        'x-fapi-interaction-id': '98c87f60-38d0-433e-83c4-0e6b9ac978ca',
        'Authorization': 'Bearer 2db4b921-4841-4058-b273-4471868e70f3'
    },
    body: JSON.stringify({"Data":{"Permissions":["ReadAccountsBasic","ReadAccountsDetail","ReadBalances","ReadBeneficiariesBasic","ReadBeneficiariesDetail","ReadDirectDebits","ReadTransactionsBasic","ReadTransactionsCredits","ReadTransactionsDebits","ReadTransactionsDetail","ReadProducts","ReadStandingOrdersDetail","ReadProducts","ReadStandingOrdersDetail","ReadStatementsDetail","ReadParty","ReadOffers","ReadScheduledPaymentsBasic","ReadScheduledPaymentsDetail","ReadPartyPSU"]},"Risk":{}})

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
    ```

    Response:
    <!-- get the ConsentId -->
    ```
    "ConsentId": "aac-fd8aae75-1ea0-4810-94d0-7029372c212f",
    ```

    Proxima requisicao:
    ```
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/ozone/v1.0/auth-code-url/aac-fd8aae75-1ea0-4810-94d0-7029372c212f?scope=accounts&alg=none',
    'headers': {
        'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
    ```

    Response:
    <!-- Abrir no browser e pegar o code -->
    <!-- App tem um fluxo -->
    ```
    https://auth2.tecban-sandbox.o3bank.co.uk/auth?client_id=76e960e5-d6ca-48b8-b2a3-f94a85e30a48&response_type=code&scope=openid%20accounts&request=eyJhbGciOiJub25lIn0.eyJhdWQiOiJodHRwczovL2F1dGgyLnRlY2Jhbi1zYW5kYm94Lm8zYmFuay5jby51ayIsImV4cCI6MTU5NTczMDcxMi4wNzMsImlzcyI6Ijc2ZTk2MGU1LWQ2Y2EtNDhiOC1iMmEzLWY5NGE4NWUzMGE0OCIsInNjb3BlIjoib3BlbmlkIGFjY291bnRzIiwicmVkaXJlY3RfdXJpIjoiaHR0cDovL3d3dy5nb29nbGUuY28udWsiLCJub25jZSI6ImQyZDNkZmNjLTQzZTQtNDFiNS1hMTkwLTRmMWZhYzU0YzlmMyIsInN0YXRlIjoiNTRhYTdkODMtZDU3ZS00NDQ3LTgyNmEtZDg0Nzg3YWQzNTE1IiwiY2xhaW1zIjp7ImlkX3Rva2VuIjp7Im9wZW5iYW5raW5nX2ludGVudF9pZCI6eyJ2YWx1ZSI6ImFhYy1mZDhhYWU3NS0xZWEwLTQ4MTAtOTRkMC03MDI5MzcyYzIxMmYiLCJlc3NlbnRpYWwiOnRydWV9fX19
    ```

    Uma vez que o usuario acessou o link acima, confirmou o consentimento, e necessario obter o `code` da URL de callback. enviar de volta para o meu backend 
    ```
    ce30862a-dd4f-4cb4-8ec6-f06ecfd97b86
    ```

    Proxima requisicao:
    ```
    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
    'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
    },
    form: {
        'grant_type': 'authorization_code',
        'scope': 'accounts ',
        'code': 'ce30862a-dd4f-4cb4-8ec6-f06ecfd97b86',
        'redirect_uri': 'http://www.google.co.uk'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
    ```

    Response:

    <!-- acess_token, refresh_token , armazenar isso -->
    <!-- access_token e usado para acessar as informacoes -->

    <!-- refresh token apenas para renovar o token caso expire -->
    ```
    {
    "access_token": "de4dd206-2f0b-4ecc-82ad-65f804294919",
    "expires_in": 388800,
    "token_type": "Bearer",
    "scope": "openid accounts",
    "state": "54aa7d83-d57e-4447-826a-d84787ad3515",
    "refresh_token": "4e1585a4-351b-49ac-aa01-d6f2724cb425",
    "id_token": "eyJhbGciOiJQUzI1NiIsImtpZCI6IlNOZjh3d2JhdTZxeURvckhuN2ZuTkppOUowd0hBTEpRM0cyZ2lpVVZra28ifQ.eyJzdWIiOiJhYWMtZmQ4YWFlNzUtMWVhMC00ODEwLTk0ZDAtNzAyOTM3MmMyMTJmIiwib3BlbmJhbmtpbmdfaW50ZW50X2lkIjoiYWFjLWZkOGFhZTc1LTFlYTAtNDgxMC05NGQwLTcwMjkzNzJjMjEyZiIsImlzcyI6Imh0dHBzOi8vYXV0aDIudGVjYmFuLXNhbmRib3gubzNiYW5rLmNvLnVrIiwiYXVkIjoiNzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4IiwiaWF0IjoxNTk1NzMwMzgxLCJleHAiOjE1OTU3MzM5ODEsIm5vbmNlIjoiZDJkM2RmY2MtNDNlNC00MWI1LWExOTAtNGYxZmFjNTRjOWYzIiwiYXV0aF90aW1lIjoxNTk1NzMwMzgxLCJhenAiOiI3NmU5NjBlNS1kNmNhLTQ4YjgtYjJhMy1mOTRhODVlMzBhNDgiLCJyZWZyZXNoX3Rva2VuX2V4cGlyZXNfYXQiOjE2MDM1MDYzODEsImNfaGFzaCI6InN4WWNFa2drS25nMU1kektRa1FHbHciLCJzX2hhc2giOiJhTXZWV0JxeTZvS3duUUo3M2l0aTNBIiwiYWNyIjoidXJuOm9wZW5iYW5raW5nOnBzZDI6c2NhIn0.eEDxhepgRJxY9TYa9qqKMdTMUHNjM-uY88nJ2OOQrUMPrDaCP0GLCmMt33LTuzZjpX0PHH_8Icha6O230B9QxQVgvH8S_emPLUiDZ3TeHTGNi1Q5jAfX3aNcj8s8AoG_ITq_eKpaBWTCMTIib4d2Qgs77TsYGS19bDgWHxkCVD9SjmrZc8XUEe4_0J1whgbeyouMbESe71zOH4U2askHDwwFUxI4a2SfVszi8DnhFTzeARDoRP07iSRwnkvG_U5Hefqa4ahyRBuoQOVwC-KQVip2b-6l_D8Dwalvb-AZWqqwCcFG_m0ASGIp-K27J25pKOUnC1bJZ4twYNglVn26hA"
    }
    ```


## Obtendo informacoes

Basic information:

    ```
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/party',
    'headers': {
        'Content-Type': 'application/json',
        'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
        'x-fapi-interaction-id': '625705ec-abd8-450f-88aa-d70f56274510',
        'Authorization': 'Bearer de4dd206-2f0b-4ecc-82ad-65f804294919'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });
    ```

Balance

    ```
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/aisp/balances',
    'headers': {
        'Content-Type': 'application/json',
        'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
        'x-fapi-interaction-id': 'e5185f13-7436-494e-9e4c-7f32c54f7c38',
        'Authorization': 'Bearer de4dd206-2f0b-4ecc-82ad-65f804294919'
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

    ```

Realizar pagamento programado
1-
```
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
  },
  form: {
    'grant_type': 'client_credentials',
    'scope': 'payments openid'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

2- Obter URL de consentimento

```
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/pisp/domestic-standing-order-consents',
  'headers': {
    'Content-Type': 'application/json',
    'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
    'x-fapi-interaction-id': 'f7eb4242-687b-4011-972a-e9bc2c512547',
    'Authorization': 'Bearer 5f756bad-e00d-4537-b40b-f9e1e957e6ba'
  },
  body: JSON.stringify({"Data":{"Permission":"Create","Initiation":{"Frequency":"EvryDay","FirstPaymentDateTime":"2020-10-01T13:14:25+00:00","FinalPaymentDateTime":"2020-10-01T13:14:25+00:00","FirstPaymentAmount":{"Amount":"10.00","Currency":"BRL"},"CreditorAccount":{"SchemeName":"BR.CPF","Identification":"12345678901","Name":"José da Silva Xavier"}}},"Risk":{}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

Gerar A URL de consentimento

```
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/ozone/v1.0/auth-code-url/sdp-3-2ed73e63-c670-4762-96b4-681aaaceb222?scope=payments&alg=none',
  'headers': {
    'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```

Interceptar o token na URL de callback.

```d4951cd5-c41a-44be-ade5-78a0400b1672```

Pegar o access_token

```
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://as2.tecban-sandbox.o3bank.co.uk/token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic NzZlOTYwZTUtZDZjYS00OGI4LWIyYTMtZjk0YTg1ZTMwYTQ4OmY5YjFkZjA1LTg3YmItNGM5MS1hMGM3LWQyOTJmNzQ1YTk1OA=='
  },
  form: {
    'grant_type': 'authorization_code',
    'scope': 'payments',
    'code': 'd4951cd5-c41a-44be-ade5-78a0400b1672',
    'redirect_uri': 'http://www.google.co.uk'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```

Por fim, confirmar a transacao:
```
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://rs2.tecban-sandbox.o3bank.co.uk/open-banking/v3.1/pisp/domestic-standing-orders',
  'headers': {
    'Content-Type': 'application/json',
    'x-fapi-financial-id': 'c3c937c4-ab71-427f-9b59-4099b7c680ab',
    'x-fapi-customer-ip-address': '10.1.1.10',
    'x-fapi-interaction-id': '4d1ffe73-c89a-4099-bff5-5769c23a4aa9',
    'Authorization': 'Bearer e4fc7892-b8c3-4627-a176-b6fa6d7f5718'
  },
  body: JSON.stringify({"Data":{"ConsentId":"sdp-3-2ed73e63-c670-4762-96b4-681aaaceb222","Initiation":{"Frequency":"EvryDay","FirstPaymentDateTime":"2020-10-01T13:14:25+00:00","FinalPaymentDateTime":"2020-10-01T13:14:25+00:00","FirstPaymentAmount":{"Amount":"10.00","Currency":"BRL"},"CreditorAccount":{"SchemeName":"BR.CPF","Identification":"12345678901","Name":"José da Silva Xavier"}}},"Risk":{}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```



App -> Backend (client_cetificate.crt)