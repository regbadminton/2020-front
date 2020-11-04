import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonAlert, AlertButton } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {registerServiceWorker, createPushSubscription} from "../setUpNotifications";

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = React.useState(true);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertHeader, setAlertHeader] = React.useState("");
  const [alertSubheader, setAlertSubheader] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  
  const [alertButtons, setAlertButtons] = React.useState([{text: ""}] as AlertButton[]);

  React.useEffect(()=>{
    const defaultButton: AlertButton = {
      text: "OK",
      role: "cancel",
      handler: ()=>setShowAlert(false)
    };

    const showErrorAlert = (message: string) =>{
      setAlertButtons([defaultButton]);
      setAlertHeader(message);
      setAlertSubheader("");
      setAlertMessage("");
      setShowAlert(true);
      setShowLoading(false);
    }
  
    const createYesAndNoButtons = (registration: ServiceWorkerRegistration): Array<AlertButton> => [
      {
        text: "Yes",
        handler: async ()=> {
          setShowAlert(false);
          setShowLoading(true);
          try {
            await createPushSubscription(registration);
            setTimeout(()=>setShowLoading(false), 1500)
          } catch (error) {
            showErrorAlert(error.message);
          }
        }
      },
      {
        text: "No",
        role: "cancel",
        handler: ()=>{
          setShowAlert(false);
          showErrorAlert("You have declined to recieve notifications")
        }
      }
    ];

    const setUp = async ()=> {
      try {
        const swRegistration = await registerServiceWorker();
        if (!swRegistration) throw new Error("Your browser does not support web notifications");
        
        setAlertHeader("Would you like to recieve badminton registration alerts?");
        const yesAndNoButtons = createYesAndNoButtons(swRegistration)
        setAlertButtons(yesAndNoButtons);
        setShowLoading(false);
        setShowAlert(true);
        
      } catch (error) {
        showErrorAlert(error.message);
      }
    }
    setUp();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Badminton Alerts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading
          isOpen={showLoading}
          message={'Please wait...'}
        />
        <IonAlert
          isOpen={showAlert}
          header={alertHeader}
          message={alertMessage}
          subHeader={alertSubheader}
          buttons={alertButtons}
        />
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
