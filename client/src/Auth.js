import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '654502246790-groc6p9vsheub14rd5hcb7recmfsnnrp.apps.googleusercontent.com'; 

function Auth({ onSuccess, onFailure }) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email',
      }).then(() => {
        gapi.signin2.render('g-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSuccess,
          'onfailure': onFailure,
        });
      }).catch((error) => {
        console.error('Error initializing gapi.client:', error);
        alert(`Error initializing gapi.client: ${error.message || error.details || JSON.stringify(error)}`);
      });
    }

    gapi.load('client:auth2', start);
  }, [onSuccess, onFailure]);

  return (
    <div>
      <div id="g-signin2"></div>
    </div>
  );
}

export default Auth;