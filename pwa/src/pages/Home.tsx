import React, { useState } from 'react';
import { IonPage, IonContent, IonSearchbar, IonItem, IonCard, IonCardHeader, IonCardContent, IonText } from '@ionic/react';
import './Home.css'
import { useHistory } from "react-router"

const Pagamentos = [
    [
        {
            img: '/assets/pix.svg',
            text: 'PIX'
        },
        {
            img: '/assets/credito.svg',
            text: 'Cartão de crédito'
        },
    ],
    [
        {
            img: '/assets/debito.svg',
            text: 'Cartão de débito'
        },
        {
            img: '/assets/boleto.svg',
            text: 'Boleto'
        }
    ]
]

const Home: React.FC = () => {
    const [searchText, setSearchText] = useState<string>()
    const history = useHistory();
    return (
        <IonPage>
            {/* <IonContent> */}
            <div id="main-div">
                <div id="first-div">
                    <div id="title-div">
                        <h2>Alugue o <br />apartamento <br />ideal para você</h2>
                        <img src="/assets/home.png" alt="home" />
                    </div>
                    <div id="input-div">
                        <input
                            value={searchText}
                            onChange={e => setSearchText(e.target.value!)}
                            className='procure'
                            placeholder='   Buscar...'
                        />
                    </div>
                </div>
                <div id="secondary-div">
                    <h1 id="tt">Selecione uma opção de pagamento</h1>
                    {
                        Pagamentos.map((GrupoPagamento, index) => (
                            <div className="payment-row" key={index}>
                                {
                                    GrupoPagamento.map((pagamento, index) => (

                                        <div key={index} className='payment' onClick={() => {
                                            history.push('/lista')
                                        }}>
                                            <div className='img-div'>
                                                <img src={pagamento.img} />
                                            </div>
                                            <div>
                                                <IonText>{pagamento.text}</IonText>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* </IonContent> */}
        </IonPage>
    )
}

export default Home;