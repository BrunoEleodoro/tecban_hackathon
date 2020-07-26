# Api Tec ban

## Contas

### Criar consentimento

* #### Post 1: com o envio do basic token devolve o token de acesso
* #### Post 2: cria o consentimento, assim permitindo o uso do link de aprovação
* #### Get 3: com o envio do basic token, id do consentimento e conta devolve o link de aprovação

*Types*:

``` ts
<string>
```

### Pegar contas aprovadas no consentimento

* Get 1: pega todas a constas vinculadas
* Get 2: com o envio do id da conta á devolve caso exista

*Types*:

``` ts
interface Get1 {
    Data: {
        Account: {
            AccountId: string,
            Currency: string,
            Nickname: string,
            AccountType: string,
            AccountSubType: string,
            Account: {
                SchemeName: string,
                Name: string,
                Identification: string
            }[]
        }[],
        Links: {
            Self: string
        },
        Meta: {
            TotalPages: number
        }
    }
}

interface Get2 {
        Data: {
        Account: {
            AccountId: string,
            Currency: string,
            Nickname: string,
            AccountType: string,
            AccountSubType: string,
            Account: {
                SchemeName: string,
                Name: string,
                Identification: string
            }[]
        }[], // só uma posição: [0]
        Links: {
            Self: string
        },
        Meta: {
            TotalPages: number
        }
    }
}
```

### Pegar os saldos das contas

* Get 1: pega os saldos de todas as contas
* Get 2: com o envio do id da conta devolve o saldo da mesma se existir

*Types*:

``` ts
interface Get1 {
    Data: {
        Balance: {
            AccountId: string,
            Amount: {
                Amount: string,
                Currency: string
            },
            CreditDebitIndicator: string,
            Type: string,
            DateTime: string
        }[]
    },
    Links: {
        Self: string
    },
    Meta: {
        TotalPages: number
    }
}

interface Get2 {
    Data: {
        Balance: {
            AccountId: string,
            Amount: {
                Amount: string,
                Currency: string
            },
            CreditDebitIndicator: string,
            Type: string,
            DateTime: string
        }[], // só uma posição: [0]
    },
    Links: {
        Self: string
    },
    Meta: {
        TotalPages: number
    }
}
```

### Pegar os produtos relacionados as contas

* Get 1: obtém toda lista de produtos das contas
* Get 2: obtém a lista de produtos de um conta existente com envio do id

*Types*:

``` ts
interface Get1 {
    Data: {
        Product: {
            ProductName: string,
            ProductId: string,
            AccountId: string,
            SecondaryProductId: string,
            ProductType: string,
            MarketingStateId: string,
            BCA: {
                CreditInterest: {
                    TierBandSet: {
                        TierBandMethod: string,
                        TierBand: {
                            Identification: string,
                            TierValueMinimum: string,
                            CalculationFrequency: string,
                            ApplicationFrequency: string,
                            FixedVariableInterestRateType: string,
                            AER: string
                        }[]
                        Destination: string
                    }[]
                }
                Overdraft: {
                    Notes: [string],
                    OverdraftTierBandSet: {
                        TierBandMethod: string,
                        OverdraftType: string,
                        Identification: string,
                        AuthorisedIndicator: boolean,
                        BufferAmount: string,
                        Notes: [string],
                        OverdraftTierBand: {
                            Identification: string,
                            TierValueMin: string,
                            TierValueMax: string,
                            EAR: string,
                            Notes: [string]
                        }[]
                    }[]
                }
            },
            OtherFeesCharges: []
            ProductDetails: {
                Segment: [string],
                FeeFreeLength: number,
                FeeFreeLengthPeriod: string
            }
            }[]
        },
        Links: {
            Self: string
        },
        Meta: {
            TotalPages: number
        }
    }
}

interface Get2 {
    // a mesma coisa, porém com apenas uma posição no array products
}
```

### Pegar os beneficiários das contas

* Get 1: obtém toda lista de beneficiários das contas
* Get 2: obtém a lista de beneficiários de um conta existente com o envio do id

*Types*:

``` ts
interface Get1 {
    Data: {
        Beneficiary: {
            AccountId: string,
            BeneficiaryId: string,
            Reference: string,
            CreditorAccount: {
                SchemeName: string,
                Identification: string
            },
            CreditorAgent: {
                SchemeName: string,
                Identification: string
            }
        }[]
    },
    Links: {
        Self: string
    },
    Meta: {
        TotalPages: number
    }
}

interface Get2 {
    // a mesma coisa, porém com apenas uma posição no array Beneficiary
}
```

### Obter histórico de transações
* Get 1: pega todas as transações de todas as contas
* Get 2: pega todas as transações da conta do id enviado
*Types*:

``` ts
interface Get1 {
    Data: {
        Transaction: {
            AccountId: string,
            BookingDateTime: string,
            ValueDateTime: string,
            TransactionInformation: string,
            TransactionId: string,
            Amount: {
                Amount: string,
                Currency: string
            },
            CreditDebitIndicator: string,
            Status: string,
            MerchantDetails: {},
            TransactionMutability: string,
            TransactionReference: string,
            BankTransactionCode: {
                Code: string,
                SubCode: string
            },
            Balance: {
                Amount: {
                    Amount: string,
                    Currency: string
                },
                CreditDebitIndicator: string,
                Type: string
            }
        }[]
    },
    Links: {
        Self: string
    },
    Meta: {
        TotalPages: number
    }
}

interface Get2 {
    // a mesma coisa, porém com apenas uma posição no array Transaction
}
```

### Obter os débitos automáticos das contas
* Get 1: pega todos os débitos automáticos de todas as contas
* Get 2: pega todos os débitos automáticos da conta do id enviado
*Types*:

``` ts
interface Get1: {
    Data: {
        DirectDebit: {
            AccountId: string,
            MandateIdentification: string,
            DirectDebitStatusCode: string,
            Name: string,
            PreviousPaymentDateTime: string,
            DirectDebitId: string,
            Amount: {
                Amount: string,
                Currency: string
            }
        }[]
    },
    Links: {
        Self: string
    },
    Meta: {
        TotalPages: number
    }
}

interface Get2 {
    // a mesma coisa, porém com apenas uma posição no array DirectDebit
}
```


