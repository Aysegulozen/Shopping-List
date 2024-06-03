import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import guestAvatar from '../assets/images/user.icon.jpeg'; // Guest avatar image
import './SignUpPage.css';

const CLIENT_ID = '654502246790-78ejui2sfbgdhaa6k0pq1nnr49stjv10.apps.googleusercontent.com';

function SignUpPage({ onLoginSuccess, onLoginFailure }) {
  const handleGuestLogin = () => {
    const user = { name: 'Guest', email: 'guest@example.com', picture: guestAvatar };
    onLoginSuccess(user);
  };

  return (
    <div className="signup-container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Shopping List</h1>
      <p className="text-xl mb-8">Please Sign up</p>
      <div className="oauth-buttons flex flex-col gap-4 items-center">
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const user = {
                name: credentialResponse.profileObj.name,
                email: credentialResponse.profileObj.email,
                picture: credentialResponse.profileObj.imageUrl
              };
              onLoginSuccess(user);
            }}
            onError={() => {
              console.log('Login Failed');
              onLoginFailure();
            }}
          />
        </GoogleOAuthProvider>

        <p className="text-xl mb-8">or</p>

        <button
          onClick={handleGuestLogin}
          className="px-4 py-2 bg-gray-200 text-black font-bold rounded-md"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;