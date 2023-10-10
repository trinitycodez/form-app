import './globals.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/login/LoginPage';
import LayoutApp from './components/LayoutApp';
import SignupPage from './components/signup/SignupPage';
import AppHome from './components/AppHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

const App = () => {

  const [isLogin, setLogin] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <main className='App-main bg-layout'>
          <Routes>
            <Route path='/' element={<LayoutApp />} />
            <Route path='/app'>
              <Route index element={<AppHome login={isLogin} />} />
              <Route path='login' element={
                <GoogleOAuthProvider clientId={`${process.env.REACT_APP_HOLDER_KEY}`}>
                  <LoginPage loginUser={(val) => setLogin(val)} />
                </GoogleOAuthProvider>
              } />
              <Route path='signup' element={
                <GoogleOAuthProvider clientId={`${process.env.REACT_APP_HOLDER_KEY}`}>
                  <SignupPage />
                </GoogleOAuthProvider>
              } />            
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
