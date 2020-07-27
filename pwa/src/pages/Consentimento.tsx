import React, { useState } from 'react';
import './Banco.css'
import { IonPage, IonContent, IonTitle, IonList, IonItem, IonCard, IonButton, IonLoading } from '@ionic/react';
import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";
import { useHistory, useLocation, } from "react-router"
import { useEffect } from 'react';


const Consentimento: React.FC = () => {
  const history = useHistory()
  const location = useLocation();
  const [url, setUrl] = useState()
  const [loading, setLoading] = useState<boolean>(false);
  const [myWindow, setMyWindow] = useState()

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
          window.location.href = response.data.url
          // var myWindow = window.open(response.data.url, "myWindow")

          // if (myWindow) {
          //   setMyWindow(myWindow);
          //   myWindow.onbeforeunload = function () {
          //     // processing event here
          //     console.log('unload');
          //     alert("new window closed");
          //     console.log(myWindow?.location.href)
          //   }
          // }

          // history.push('/banco')
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (location.search != "") {
      console.log(history, location)
      let code = location.search.split("code=")
      code = code[1].split("&")
      let codeFinal = code[0]
      console.log(codeFinal)
      sendCallback(codeFinal)
    } else {
      getURL();
    }


  }, [])

  function sendCallback(code: string) {
    setLoading(true);
    var data = JSON.stringify({ "cpf": localStorage.getItem("cpf"), "code": code });

    var config: AxiosRequestConfig = {
      method: 'post',
      url: `${baseUrl}banking/callback`,
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
        {/* <iframe id="iframe" src={`${url}`} style={{ width: '100%', height: '100%' }} scrolling="yes" onError={(e) => {
          console.log('error', e);
        }} onLoad={(e: any) => {
          console.log('onload', e)
          console.log('onload')
          console.log('onload')
          console.log('onload')
          console.log('onload')
          console.log('onload')
          console.log('onload')
          console.log(e.target.src)
          if (e.target.src.includes("brunoeleodoro.com")) {
            // sendCallback(e.target.src)
            console.log('brunoeleodoro.com', e.target.src)
          }//test2

          // let iframe = document.getElementById("iframe");
          // if(iframe) {
          //   console.log(.contentWindow.location.href)
          // }
        }}></iframe> */}
        {/* <WebView src={`${url}`} /> */}
        {/* <button onClick={() => {
          if(myWindow){
            alert(myWindow.location.href)
            myWindow.close();
          }
          
        }}>Confirmar</button> */}
      </IonContent>
    </IonPage>
  )
}

export default Consentimento;