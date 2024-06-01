import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';

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
      <div className="App">
        <NavBar user={user} onSignOut={onSignOut} />
        <Routes>
          {!user ? (
            <Route
              path="/"
              element={<SignUpPage onLoginSuccess={onLoginSuccess} onLoginFailure={onLoginFailure} />}
            />
          ) : (
            <Route
              path="/"
              element={<HomePage user={user} onSignOut={onSignOut} />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;