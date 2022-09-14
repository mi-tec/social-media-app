import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import PrivateRoutes from './PrivateRoutes';

import Login from './Components/Login/Login';

import Header from './Components/Header/Header';

import CreateUser from './Components/CreateUser/CreateUser';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';

import VerifyLoggedIn from './VerifyUser';
import { useEffect, useState } from 'react';

function App() {
  const currentUser = VerifyLoggedIn()
  const location = useLocation();

  const locationPath = location.pathname;

  const [bgcolor, setBgColor] = useState("");
  const [txtcolor, setTxtcolor] = useState("");

  useEffect(() => {
    if (locationPath === '/') {
      setTxtcolor('text-black');
      setBgColor('bg-blue-700');
    } else {
      setTxtcolor('text-white');
      setBgColor('bg-gray-900');
    }
  }, [locationPath]);

  if (currentUser === undefined) return null;

  return (
    <div className={`App min-h-full h-full ${bgcolor} ${txtcolor}`}>
      {currentUser && <Header />}
      <div className={`App__body h-full ${currentUser ? 'pt-[65px]' : ''} `}>
        <Routes>
          <Route index element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="home" element={<Home />} />
            <Route path="create-user" element={<CreateUser />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
