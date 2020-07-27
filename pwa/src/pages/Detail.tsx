import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import './Detail.css'

const detail = {
    img: '/assets/example.svg',
    nome: 'Apartamento Aluguel - Hortolândia - Cobertura',
    descricao: 'Apartamento cobertura - com 3 dormitórios, sendo 3 suítes, 136,00m²',
    aluguel: 1000,
    condominio: 100,
    IPTU: 0,
    seguroIncendio: 0,
}

const Detail: React.FC = () => {

    function getTotal() {
        return detail.IPTU + detail.seguroIncendio + detail.aluguel + detail.condominio
    }

    return (
        <IonPage>
            <IonContent>
                <div className='back-color ion-padding'>
                    <div id="flex-div">
                        <img src={detail.img} alt='prédio' id='img' />
                        <div>
                            <h2><b>{detail.nome}</b></h2>
                            <h4>{detail.descricao}</h4>
                        </div>
                    </div>
                    <div id='prices-div'>
                        <div className='inline-flex'>
                            <p><b>Aluguel</b></p>
                            <p>{`R$ ${detail.aluguel}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Condominio</p>
                            <p>{`R$ ${detail.condominio}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>IPTU</p>
                            <p>{`R$ ${detail.IPTU}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Seguro Incêndio</p>
                            <p>{`R$ ${detail.seguroIncendio}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Total</p>
                            <p>{`R$ ${getTotal()}`}</p>
                        </div>
                    </div>
                    <div id="btn-div">
                        <IonButton routerLink='#' color='#fff' className='btn' id='blue'>
                            Efetuar pagamento
                    </IonButton>
                        <IonButton routerLink='#' color='#669ED2' className='btn' id='white'>
                            Pagamentos realizados
                    </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Detail;