import { useState } from 'react';
import validator from 'validator';

const DatabaseModal = function ({ setShowModal }) {
  const [name, setName] = useState('');
  const [DBMS, setDBMS] = useState('');
  const avaibleDBMS = ['PhpMyAdmin', 'MongoDB', 'SQL'];

  const handleClose = function (e) {
    if (e.target.classList.contains('absolute')) {
      setShowModal(false);
    }
  };

  const handleSubmit = function () {
    if (validator.isAlpha(name)) {
      alert('input corretto');
    } else alert('no');
  };

  // todo: creare componenti per gli errori di messaggio
  return (
    <div
      onClick={handleClose}
      className='absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25'
    >
      <div className='custom-shadow w-4/5 rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new database</div>
        <div className='mb-6'>
          <div className='mb-2'>name:</div>
          <input
            onChange={e => setName(e.target.value)}
            type='text'
            value={name}
            className='w-full rounded border-[1.5px] border-light-gray'
          />
        </div>
        <div className='mb-4'>
          <div className='mb-2'>DBMS:</div>
          {avaibleDBMS.length > 0 ? (
            <select
              onChange={e => setDBMS(e.target.value)}
              className='w-full rounded border-[1.5px] border-light-gray'
              value={DBMS}
            >
              {avaibleDBMS.map(DBMS => (
                <option key={DBMS} id={DBMS}>
                  {DBMS}
                </option>
              ))}
            </select>
          ) : (
            <select className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
        </div>
        <div className='grid grid-cols-2 gap-2 py-6 text-lg font-semibold'>
          <button
            onClick={() => setShowModal(false)}
            className='w-full rounded py-2 transition-all hover:bg-light-gray'
          >
            cancel
          </button>
          <button onClick={handleSubmit} className='w-full rounded bg-blue py-2 text-white'>
            create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseModal;
