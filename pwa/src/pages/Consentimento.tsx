import React, { useState } from 'react';
import './Banco.css'
import { IonPage, IonContent, IonTitle, IonList, IonItem, IonCard, IonButton, IonLoading } from '@ionic/react';
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { useHistory } from "react-router"
import { useEffect } from 'react';
const WebView = require('react-electron-web-view');


const Consentimento: React.FC = () => {
  const history = useHistory()
  const [url, setUrl] = useState()
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    function getURL() {
      var config: AxiosRequestConfig = {
        method: 'get',
        url: `${baseUrl}banking/authorize`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setUrl(response.data.url);
          // var myWindow = window.open(response.data.url, "Bank", "height=750,width=1250,scrollbars=1,resizable=1,location=1")

          // if (myWindow) {
          //   console.log('window, ', myWindow.location);
          // }

          // history.push('/banco')
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getURL();

  }, [])

  function sendCallback(code: string) {
    setLoading(true);
    var data = JSON.stringify({ "cpf": localStorage.getItem("cpf"), "code": code });

    var config: AxiosRequestConfig = {
      method: 'post',
      url: `${baseUrl}users/signup`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        history.push('/home')
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <IonPage>
      <IonContent>
        <iframe id="iframe" src={`${url}`} style={{ width: '100%', height: '100%' }} scrolling="yes" onError={(e) => {
          console.log('error', e);
        }} onLoad={(e: any) => {
          console.log('onload', e)
          console.log(e.target.src)
          if (e.target.src.includes("google.co.uk")) {
            sendCallback(e.target.src)
          }

          // let iframe = document.getElementById("iframe");
          // if(iframe) {
          //   console.log(.contentWindow.location.href)
          // }
        }}></iframe>
        {/* <WebView src={`${url}`} /> */}

      </IonContent>
    </IonPage>
  )
}

export default Consentimento;