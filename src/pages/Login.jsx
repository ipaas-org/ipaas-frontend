const Login = function ({ setLoggedIn }) {
  const handleLogin = function () {
    setLoggedIn(true);
  };
  return (
    <div className='flex h-screen items-center justify-center px-2'>
      <div className='w-full md:w-1/4'>
        <h1 className='text-center text-6xl font-bold md:text-8xl'>IPAAS</h1>
        <p className='mt-1 text-center text-xl'>itis paleocapa as a service</p>
        <button
          onClick={handleLogin}
          className='mt-8 w-full rounded-md bg-blue py-2 text-lg font-medium text-white transition-all hover:-translate-y-1'
        >
          accedi con PaleoID
        </button>
      </div>
    </div>
  );
};

export default Login;
