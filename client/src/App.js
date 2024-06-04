import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';

const clientId = '654502246790-78ejui2sfbgdhaa6k0pq1nnr49stjv10.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState(null);

  const onLoginSuccess = (user) => {
    console.log('Login Success:', user);
    setUser(user);
  };

  const onLoginFailure = () => {
    console.log('Login failed');
  };

  const onSignOut = () => {
    setUser(null);
  };

  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="App">
          <NavBar user={user} onSignOut={onSignOut} />
          <Routes>
            {!user ? (
              <Route
                path="/"
                element={
                  <SignUpPage
                    onLoginSuccess={onLoginSuccess}
                    onLoginFailure={onLoginFailure}
                  />
                }
              />
            ) : (
              <Route
                path="/"
                element={<HomePage user={user} onSignOut={onSignOut} />}
              />
            )}
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;