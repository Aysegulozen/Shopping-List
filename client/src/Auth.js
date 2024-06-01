import React from 'react';

function Auth({ onSuccess, onFailure }) {
  const handleLogin = () => {
    
    const dummyUser = {
      name: 'Test User',
      email: 'testuser@example.com',
    };
    onSuccess(dummyUser);
  };

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Dummy Account</button>
    </div>
  );
}

export default Auth;