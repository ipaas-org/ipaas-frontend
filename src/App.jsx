import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Application from './pages/Application';

const App = function () {
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(()=>{
  //   setLoggedIn(true);
  // }, [])

  return loggedIn ? <Application /> : <Login callback={setLoggedIn} />;
};

export default App;
