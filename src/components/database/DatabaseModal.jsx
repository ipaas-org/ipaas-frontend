import { useState, useEffect } from 'react';
const DatabaseModal = function ({ setShowModal }) {
  const [databaseName, setDatabaseName] = useState('');
  const [databaseDBMS, setDatabaseDBMS] = useState('MongoDB');
  // todo: fare il controllo sui dati in input con validator e creare componenti per gli errori di messaggio
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-25'>
      <div className='custom-shadow w-4/5 rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new database</div>
        <div className='mb-6'>
          <div className='mb-2'>name:</div>
          <input
            onChange={e => setDatabaseName(e.target.value)}
            type='text'
            value={databaseName}
            className='w-full rounded border-[1.5px] border-light-gray'
          />
        </div>
        <div className='mb-4'>
          <div className='mb-2'>DBMS:</div>
          <select
            onChange={e => setDatabaseDBMS(e.target.value)}
            className='w-full rounded border-[1.5px] border-light-gray'
            value={databaseDBMS}
          >
            <option>MongoDB</option>
            <option>MySQL</option>
            <option>PhpMyAdmin</option>
          </select>
        </div>
        <div className='grid grid-cols-2 gap-2 py-6 text-lg font-semibold'>
          <button
            onClick={() => setShowModal(false)}
            className='w-full rounded py-2 transition-all hover:bg-light-gray'
          >
            cancel
          </button>
          <button className='w-full rounded bg-blue py-2 text-white'>create</button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseModal;
