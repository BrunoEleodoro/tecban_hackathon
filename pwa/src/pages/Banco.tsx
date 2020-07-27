import React, { useState } from 'react';
import './Banco.css'
import { IonPage, IonContent, IonTitle, IonList, IonItem, IonCard, IonButton, IonLoading } from '@ionic/react';
import Swal from "sweetalert2"
import { useHistory } from "react-router"
import { refresh } from 'ionicons/icons';

const bancos = [
  // {
  //   nome: 'Caixa Econômica Federal',
  //   url: 'google.com',
  //   img: '/assets/caixa.svg'
  // },
  {
    nome: 'Itáu',
    url: 'google.com',
    img: '/assets/itau.svg'
  },
  {
    nome: 'Bradesco',
    url: 'google.com',
    img: '/assets/bradesco.svg'
  }
]

const Banco: React.FC = () => {
  const history = useHistory()

  const [selectedItems, setSelectedItems] = useState<number[]>([])

  function handleClick(id: number) {
    const alredySelected = selectedItems.findIndex((index) => {
      return id === index
    }) // return -1 in false case

    if (alredySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => {
        return item !== id
      })

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  async function next() {
    if (selectedItems.length === 0) {
      return Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Selecione um ou mais bancos para continuar',
        showConfirmButton: false,
        timer: 2000
      })
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn-green',
        cancelButton: 'btn-red'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Concorda conceder seus dados bancários?',
      text: "Precisamos do seu consentimento dos seus dados",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true
    }).then(async (result: any) => {
      if (result.value) {
        confirm()
        return
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        await swalWithBootstrapButtons.fire({
          position: 'center',
          icon: 'success',
          title: 'Cancelado!',
          showConfirmButton: false,
          timer: 2000
        })
        history.push('/login')
      }
    })
  }

  async function confirm() {
    // alert(selectedItems)
    // confirma o consentimento com o backend await 

    history.push('/consentimento')
    window.location.reload(false);
  }

  return (
    <IonPage>
      <IonContent>

        <h1 className="banco-title"><b>Banco</b></h1>
        <br />
        <IonList>
          {
            bancos.map((banco, index) => (
              <IonItem
                key={index}
                onClick={() => handleClick(index)}
              >
                <IonCard
                  className={`banco-card flex-item ${selectedItems.includes(index) ? 'selected' : ''}`}
                >
                  <img src={banco.img} />
                  <p>
                    {`${banco.nome}`}
                  </p>
                </IonCard>
              </IonItem>
            ))
          }
        </IonList>
        <br />
        <IonButton
          className="ion-float-right ion-margin-horizontal"
          onClick={next}
        >
          Próximo
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Banco;