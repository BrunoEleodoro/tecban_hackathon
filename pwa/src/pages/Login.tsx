import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import React from 'react';
import './Login.css'
// import img1 from '../../public/assets/img1.svg'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <br/><br/>
        <img src={"http://localhost:3333/assets/img1.svg"} alt="prédio" className="center"/>
        <IonText>Entrar</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Home;
