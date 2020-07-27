import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonLoading } from '@ionic/react';
import React, { useState } from 'react';
import './Login.css'
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { personOutline, lockClosedOutline } from "ionicons/icons"
import { useHistory } from "react-router";


const Home = () => {

  const [loading, setLoading] = useState(false);

  function getImoveis() {
    setLoading(true);
    var data = JSON.stringify({ "cpf": cpf, "password": password });

    var config = {
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
        Home
      </IonContent>
    </IonPage >
  );
};

export default Home;
