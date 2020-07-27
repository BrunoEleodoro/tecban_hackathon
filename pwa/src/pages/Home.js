import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonLoading, IonThumbnail, IonAvatar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Login.css'
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { personOutline, lockClosedOutline } from "ionicons/icons"
import { useHistory } from "react-router";



const Home = () => {
  const [cpf, setCPF] = useState()
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState()

  useEffect(() => {
    setLoading(true)
    function getURL() {
      var config = {
        method: 'get',
        url: `${baseUrl}houses/`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));

          setLoading(false)
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false)
        });
    }
    getURL();

  }, [])
  if (loading) {
    return (
      <IonLoading isOpen />
    )
  }

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem>
            <IonAvatar slot="start">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <br />
            <IonLabel>Item Avatar</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Home;
