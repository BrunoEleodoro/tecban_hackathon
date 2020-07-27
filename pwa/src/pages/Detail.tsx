import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton, IonLoading } from '@ionic/react';
import './Detail.css'
import { useParams } from "react-router"
import { baseUrl } from "./constants";
import axios, { AxiosRequestConfig } from "axios"
import { flash } from 'ionicons/icons';

const detail = {
    imgs: '/assets/example.svg',
    title: 'Apartamento Aluguel - Hortolândia - Cobertura',
    description: 'Apartamento cobertura - com 3 dormitórios, sendo 3 suítes, 136,00m²',
    rent_price: 1000,
    condominium: 100,
    iptu: 0,
    fire_insurance: 0,
}

// interface Detail {
//     total: number,

// }

const Detail: React.FC = () => {
    // const { id } = useParams()

    // const [loading, setLoading] = useState<boolean>(false)
    // const [detail, setDetail] = useState<any>()

    // function getTotal() {
    //     return detail.iptu + detail.fire_insurance + detail.rent_price + detail.condominium
    // }

    // useEffect(() => {
    //     setLoading(true)
    //     var config: AxiosRequestConfig = {
    //         method: 'post',
    //         url: `${baseUrl}users/auth`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             console.log(JSON.stringify(response.data));
    //             setDetail(response.data.house)
    //             setLoading(false)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             setLoading(false);
    //         });
    // }, [])

    // if (loading) {
    //     return (
    //         <IonLoading isOpen />
    //     )
    // }

    return (
        <IonPage>
            <IonContent>
                <div className='back-color ion-padding'>
                    <div id="flex-div">
                        <img src={detail.imgs} alt='prédio' id='img' />
                        <div>
                            <h2><b>{detail.title}</b></h2>
                            <h4>{detail.description}</h4>
                        </div>
                    </div>
                    <div id='prices-div'>
                        <div className='inline-flex'>
                            <p><b>Aluguel</b></p>
                            <p>{`R$ ${detail.rent_price}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Condominio</p>
                            <p>{`R$ ${detail.condominium}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>IPTU</p>
                            <p>{`R$ ${detail.iptu}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Seguro Incêndio</p>
                            <p>{`R$ ${detail.fire_insurance}`}</p>
                        </div>
                        <div className='inline-flex'>
                            <p>Total</p>
                            <p>{`R$ 1100.00`}</p>
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