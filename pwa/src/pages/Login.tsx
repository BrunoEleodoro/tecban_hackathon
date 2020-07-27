import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import './Login.css'
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { personOutline, lockClosedOutline } from "ionicons/icons"
import { useHistory } from "react-router";


const Home: React.FC = () => {
  const history = useHistory();
  const [cpf, setCPF] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState<boolean>(false);

  function signIn() {
    setLoading(true);
    var data = JSON.stringify({ "cpf": cpf, "password": password });

    var config: AxiosRequestConfig = {
      method: 'post',
      url: `${baseUrl}users/auth`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token.token);
        setLoading(false);
        //TODO: Alterar para rota da home
        history.push('/home')
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

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
            <IonLabel position="floating"><IonIcon icon={personOutline} /> CPF</IonLabel>
            <IonInput
              value={cpf}
              onIonChange={e => setCPF(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating"><IonIcon icon={lockClosedOutline} /> Senha</IonLabel>
            <IonInput
              value={password}
              type="password"
              onIonChange={e => setPassword(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <p className="text-right">Esqueceu a senha?</p>
        <button className='buttonEntrar' onClick={signIn}>Entrar</button>
        <p className='text-conta'>
          <b>Não tem uma conta?</b> <IonRouterLink routerLink="/cadastro">Cadastrar</IonRouterLink>
        </p>
      </IonContent>
    </IonPage >
  );
};

export default Home;
