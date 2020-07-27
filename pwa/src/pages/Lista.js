import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonText, IonList, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, IonLoading, IonThumbnail, IonAvatar, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Login.css'
import axios from "axios";
import { baseUrl } from "./constants";
import { personOutline, lockClosedOutline } from "ionicons/icons"
import { useHistory } from "react-router";



const Lista = () => {
  const [cpf, setCPF] = useState()
  const [loading, setLoading] = useState(false);
  const [senha, setSenha] = useState()
  const [houses, setHouses] = useState([]);

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
          setHouses(response.data.houses)
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

        {houses.map((item) => {
          return (
            <IonCard className="ion-padding" key={item._id} routerLink={"/detail/" + item._id}>
              <img src={item.imgs[0]} alt="imagem do imovel" />
              <IonCardHeader>
                <IonCardTitle>{item.title}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {item.description}
              </IonCardContent>
            </IonCard>
          )
        })}
      </IonContent>
    </IonPage >
  );
};

export default Lista;
