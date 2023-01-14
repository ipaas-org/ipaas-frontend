import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const App = function () {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Dashboard setLoggedIn={setLoggedIn} /> : <Login setLoggedIn={setLoggedIn} />;
};

export default App;
