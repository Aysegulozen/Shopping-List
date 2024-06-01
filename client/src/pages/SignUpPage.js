import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './SignUpPage.css'; // Yeni bir CSS dosyası oluşturuyoruz

const CLIENT_ID = '654502246790-groc6p9vsheub14rd5hcb7recmfsnnrp.apps.googleusercontent.com';

function SignUpPage({ onLoginSuccess, onLoginFailure }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name: email, email };
    onLoginSuccess(user);
  };

  const handleGuestLogin = () => {
    const user = { name: 'Guest', email: 'guest@example.com' };
    onLoginSuccess(user);
  };

  return (
    <div className="signup-container flex flex-col items-center justify-center min-h-screen">
      <form
        className="signup-form  bg-opacity-80 p-6 rounded-lg  flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email1" className="block mb-2">Your email</label>
          <input
            id="email1"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password1" className="block mb-2">Your password</label>
          <input
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="rounded" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
      </form>

      <div className="oauth-buttons mt-4 flex flex-col gap-4 items-center">
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const user = { name: 'Google User', email: 'googleuser@example.com' };
              onLoginSuccess(user);
            }}
            onError={() => {
              console.log('Login Failed');
              onLoginFailure();
            }}
          />
        </GoogleOAuthProvider>

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