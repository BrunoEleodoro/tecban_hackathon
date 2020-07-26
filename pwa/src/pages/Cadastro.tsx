import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonInput, IonRouterLink, IonDatetime } from '@ionic/react';
import './Cadastro.css'
import { personOutline, phonePortraitOutline, lockClosed, calendarOutline } from 'ionicons/icons';

const Cadastro: React.FC = () => {
    const [numero, setNumero] = useState<string>()
    const [selectedDate, setSelectedDate] = useState<string>('355mlmda');
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()

    useEffect(() => {
        console.log(selectedDate)
    }, [selectedDate])

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
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
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
                <button className='buttonEntrar2'>Entrar</button>
                <p className='text-conta2'>
                    <b>Já tem uma conta?</b> <IonRouterLink routerLink="/login">Entrar</IonRouterLink>
                </p>
            </IonContent>
        </IonPage>
    )
}

export default Cadastro;