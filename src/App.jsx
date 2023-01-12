import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = function () {
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(()=>{
  //   setLoggedIn(true);
  // }, [])

  return loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />;
};

export default App;
