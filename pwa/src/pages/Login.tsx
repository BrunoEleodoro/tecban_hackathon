import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState } from 'react';
import './Login.css'
// import img1 from '../../public/assets/img1.svg'

import { personOutline, lockClosedOutline } from "ionicons/icons"

const Home: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <IonPage>
      <IonContent>
        <img src={"http://localhost:3333/assets/img1.svg"} alt="prédio" className="center"/>
        <p className="text">Entrar</p>
        
        <IonList className='list'>
            <IonItem>
                <IonLabel position="floating"><IonIcon icon={personOutline}/> CPF</IonLabel>
                <IonInput 
                  value={email} 
                  onIonChange={e => setEmail(e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating"><IonIcon icon={lockClosedOutline}/> Senha</IonLabel>
                <IonInput 
                  value={password} 
                  type="password" 
                  onIonChange={e => setPassword(e.detail.value!)}
              />
            </IonItem>
        </IonList>
        <p className="text-right">Esqueceu a senha?</p>
        <button className='buttonEntrar'>Entrar</button>
        <p className='text-conta'>
          <b>Não tem uma conta?</b> <IonRouterLink>Catastrar</IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
