import Header from '../components/header/Header';
import ApplicationContainer from '../components/application/ApplicationContainer';
import DatabaseContainer from '../components/database/DatabaseContainer';

const Dashboard = function ({ setLoggedIn }) {
  return (
    <div className='relative h-screen px-2 md:px-10 lg:px-20'>
      <Header setLoggedIn={setLoggedIn} />
      <main className='grid gap-5 md:h-5/6 md:grid-cols-12'>
        <ApplicationContainer />
        <DatabaseContainer />
      </main>
    </div>
  );
};

export default Dashboard;
