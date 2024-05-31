import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '654502246790-groc6p9vsheub14rd5hcb7recmfsnnrp.apps.googleusercontent.com'; // Buraya kendi Google Client ID'nizi ekleyin

function Auth() {
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
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = (googleUser) => {
    console.log('Login Success: currentUser:', googleUser.getBasicProfile());
  };

  const onFailure = (error) => {
    console.log('Login failed: ', error);
  };

  return (
    <div>
      <div id="g-signin2"></div>
    </div>
  );
}

export default Auth;