import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = '654502246790-groc6p9vsheub14rd5hcb7recmfsnnrp.apps.googleusercontent.com';

function Auth({ onSuccess, onFailure }) {
  const handleLogin = () => {
    const dummyUser = {
      name: 'Test User',
      email: 'testuser@example.com',
    };
    onSuccess(dummyUser);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Shopping List</h1>
        <p className="text-xl mb-8">Lütfen giriş yapın</p>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            const user = {
              name: credentialResponse.profileObj.name,
              email: credentialResponse.profileObj.email,
              picture: credentialResponse.profileObj.imageUrl
            };
            onSuccess(user);
          }}
          onError={() => {
            console.log('Login Failed');
            onFailure();
          }}
        />
        <div>
          <button onClick={handleLogin} className="px-4 py-2 bg-gray-200 text-black font-bold rounded-md mt-4">
            Continue as Guest
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Auth;