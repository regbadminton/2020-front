import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonAlert } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import setUpNotifications from "../setUpNotifications";

const Home: React.FC = () => {
  const [showLoading, setShowLoading] = React.useState(true);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertButtons, setAlertButtons] = React.useState([{text:""}]);

  React.useEffect(()=>{
    const setUp = async ()=> {
      const alert = await setUpNotifications(setShowAlert, setShowLoading);
      setAlertMessage(alert.message);
      setAlertButtons(alert.buttons);
      setShowLoading(false);
      setShowAlert(true);
    }
    setUp();
  }, []);

  const toggleLoading = () => setShowLoading(prev=>!prev)
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
          header={alertMessage}
          message={"Please Click Allow when asked"}
          buttons={alertButtons}
        />
        <ExploreContainer toggleLoading={toggleLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
