import { useState } from 'react';
const HeaderModal = function ({ setShowModal, setLoggedIn }) {
  const handleBackgroundClick = function (e) {
    if (e.target.classList.contains('absolute')) {
      setShowModal(false);
    }
  };
  return (
    <div onClick={handleBackgroundClick} className='absolute inset-0 bg-opacity-10'>
      <div
        onClick={() => setLoggedIn(false)}
        className='custom-shadow absolute right-16 mt-20 h-44 w-1/4 rounded bg-yellow-300'
      ></div>
    </div>
  );
};

export default HeaderModal;
