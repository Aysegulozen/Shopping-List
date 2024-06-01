import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '654502246790-groc6p9vsheub14rd5hcb7recmfsnnrp.apps.googleusercontent.com';

function Auth({ onSuccess, onFailure }) {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          onSuccess(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
          onFailure();
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default Auth;