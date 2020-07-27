import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCard } from '@ionic/react';
import QrReader from 'react-qr-reader'

class QrCode extends React.Component {
    // const [qrcode, setQrCode] = useState()

    constructor(props) {
        super();
        this.state = {
            result: 'No result'
        }
    }
    handleScan = data => {
        if (data) {
            this.setState({
                result: data
            })
        }
    }
    handleError = err => {
        console.error(err)
    }

    render() {
        return (
            <IonPage>
                <IonContent>
                    <QrReader
                        delay={300}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '100%' }}
                    />
                </IonContent>
            </IonPage >
        )
    }
}

export default QrCode;