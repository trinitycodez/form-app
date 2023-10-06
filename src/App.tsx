import './globals.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/login/LoginPage';
import LayoutApp from './components/LayoutApp';
import SignupPage from './components/signup/SignupPage';
import AppHome from './components/AppHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <main className='App-main bg-layout'>
          <Routes>
            <Route path='/' element={<LayoutApp />} />
            <Route path='/app'>
              <Route index element={<AppHome />} />
              <Route path='login' element={
                <GoogleOAuthProvider clientId={`${process.env.HOLDER_KEY}`}>
                  <LoginPage />
                </GoogleOAuthProvider>
              } />
              <Route path='signup' element={
                <GoogleOAuthProvider clientId={`${process.env.HOLDER_KEY}`}>
                  <SignupPage />
                </GoogleOAuthProvider>
              } />            
            </Route>
          </Routes>
          <p className='text-blue-400'>Loading...</p>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
