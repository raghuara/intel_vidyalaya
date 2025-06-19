import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import RouterPage from './Router';
import store, { persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { generateToken, messaging } from './Components/Notification/Firebase';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  useEffect(() => {
    generateToken();

    // const unsubscribe = onMessage(messaging, (payload) => {
    //   console.log("Foreground Notification Received:", payload);

    //   if (document.visibilityState === "visible") {
    //     toast(`${payload.notification?.title}: ${payload.notification?.body}`, {
    //       position: "top-right",
    //     });
    //   }
    // });

    // return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
       <Toaster position="top-right" reverseOrder={false} />
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RouterPage />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;