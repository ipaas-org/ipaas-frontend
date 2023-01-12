import { useEffect } from 'react';

// import { useState } from 'react';
const HeaderModal = function ({ setShowModal, setLoggedIn }) {
  const handleBackgroundClick = function (e) {
    if (e.target.classList.contains('absolute')) {
      setShowModal(false);
    }
  };
  return (
    <div onClick={handleBackgroundClick} className='absolute inset-0 bg-opacity-10'>
      <div className=' custom-shadow absolute right-20 mt-20 space-y-4 rounded border-r-4 border-blue bg-white py-6 px-8 text-end text-lg'>
        <div className=''>dance.vance.adam.studente@itispaleocapa.it</div>
        <div className='cursor-pointer'>theme</div>
        <div
          onClick={e => {
            setLoggedIn(false);
            e.stopPropagation();
          }}
          className='cursor-pointer font-semibold'
        >
          logout
        </div>
      </div>
    </div>
  );
};

export default HeaderModal;
