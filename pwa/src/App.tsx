import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Banco from './pages/Banco';
import QrCode from './pages/QrCode';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Detail from './pages/Detail';
import Consentimento from './pages/Consentimento';
// import Home from './pages/Login';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact={true} />
        <Route path="/cadastro" component={Cadastro} exact={true} />
        <Route path="/banco" component={Banco} exact={true} />
        <Route path="/tipo-contrato" component={Banco} exact={true} />
        <Route path="/qrcode" component={QrCode} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/detail/:id" component={Detail} exact={true} />
        <Route path="/consentimento" component={Consentimento} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/lista" component={Lista} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
