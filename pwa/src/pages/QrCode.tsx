import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCard } from '@ionic/react';

const QrCode: React.FC = () => {
    const [qrcode, setQrCode] = useState()

    useEffect(() => {
        // chama a api e pega o qr code
    }, [])

    return (
        <IonPage>
            <IonContent>
                <IonCard>
                    <img src="" alt="" />
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default QrCode;