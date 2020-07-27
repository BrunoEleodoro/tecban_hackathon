import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonInput, IonRouterLink, IonDatetime, IonLoading } from '@ionic/react';
import './Cadastro.css'
import { personOutline, phonePortraitOutline, lockClosed, calendarOutline } from 'ionicons/icons';
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { useHistory } from "react-router";

interface iResponse {
    status: number,
    message: string
}

const Cadastro: React.FC = () => {
    const history = useHistory();
    // const [response, setResponse] = useState<iResponse>({ status: 0, message: 'error' })
    const [loading, setLoading] = useState<boolean>(false);
    const [numero, setNumero] = useState<string>()
    const [selectedDate, setSelectedDate] = useState<string>('355mlmda');
    const [cpf, setCPF] = useState<string>()
    const [senha, setSenha] = useState<string>()

    function signUp() {
        setLoading(true);
        var data = JSON.stringify({ "phoneNumber": numero, "birthDate": selectedDate, "cpf": cpf, "password": senha });

        var config: AxiosRequestConfig = {
            method: 'post',
            url: `${baseUrl}users/signup`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token.token);
                if (cpf) {
                    localStorage.setItem("cpf", cpf);
                }
                setLoading(false);
                history.push('/banco')
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

    if (loading) {
        return (
            <IonLoading isOpen />
        )
    }

    return (
        <IonPage>
            <IonContent>
                <img src={'/assets/tower.svg'} alt="prédio" className="center" />

                <p className="text">Entrar</p>

                <IonList className='list'>
                    <IonItem>
                        <IonLabel position="floating"><IonIcon icon={phonePortraitOutline} /> Número do celular</IonLabel>
                        <IonInput
                            value={numero}
                            onIonChange={e => setNumero(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem className="padding">
                        <IonLabel position="floating"><IonIcon icon={calendarOutline} /> Data de nascimento</IonLabel>
                        <IonDatetime
                            displayFormat="MM/DD/YYYY"
                            value={selectedDate}
                            onIonChange={e => setSelectedDate(e.detail.value!)}
                        ></IonDatetime>
                    </IonItem>

                    <IonItem className="padding">
                        <IonLabel position="floating"><IonIcon icon={personOutline} /> CPF</IonLabel>
                        <IonInput
                            value={cpf}
                            onIonChange={e => setCPF(e.detail.value!)}
                        />
                    </IonItem>


                    <IonItem className="padding">
                        <IonLabel position="floating"><IonIcon icon={lockClosed} /> Senha</IonLabel>
                        <IonInput
                            value={senha}
                            onIonChange={e => setSenha(e.detail.value!)}
                            type="password"
                        />
                    </IonItem>
                </IonList>
                <p className="text-right">Esqueceu a senha?</p>
                <button className='buttonEntrar2' onClick={signUp}>Entrar</button>
                <p className='text-conta2'>
                    <b>Já tem uma conta?</b> <IonRouterLink routerLink="/login">Entrar</IonRouterLink>
                </p>
            </IonContent>
        </IonPage>
    )
}

export default Cadastro;