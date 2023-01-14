import { useState } from 'react';
import HeaderModal from './HeaderModal';
const Header = function ({ setLoggedIn }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className='grid grid-cols-2 pt-8 pb-5'>
      <div className='flex items-center pb-1 font-medium md:text-lg'>Itis Paleocapa As A Service</div>
      <div>
        <div className='flex items-center justify-end'>
          <p className='mr-8 md:text-lg'>Adriano rampoldi</p>
          <button
            onClick={() => setShowModal(true)}
            className='h-10 w-10 overflow-hidden rounded-full border-2 transition-all hover:border-blue'
          >
            <img className='object-cover' src='https://picsum.photos/400' alt='user profile picture' />
          </button>
        </div>
      </div>
      {showModal && <HeaderModal setShowModal={setShowModal} setLoggedIn={setLoggedIn} />}
    </header>
  );
};

export default Header;
