import { useState } from 'react';
import DatabaseItem from './DatabaseItem';
import DatabaseModal from './DatabaseModal';
import LoadingMessage from '../LoadingMessage';
import ErrorMessage from '../ErrorMessage';
import useFetch from './../../utils/useFetch'

const sleep = function (s) {
  return new Promise(res => setTimeout(res, s * 1000));
};

const DatabaseContainer = function () {
  const { data, loading, error } = useFetch();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='custom-shadow overflow-hidden rounded-xl md:col-span-4'>
      <div className='h-full w-full divide-y divide-light-gray overflow-y-auto'>
        <div className='flex items-center justify-between px-8 py-6 text-xl font-semibold'>
          <span>Database</span>
          <button onClick={() => setShowModal(true)} className='rounded bg-blue py-1 px-3 text-base text-white'>
            new
          </button>
        </div>
        {loading && <LoadingMessage />}
        {data?.database?.map((database, key) => (
          <DatabaseItem database={database} key={key} />
        ))}
        {error && <ErrorMessage message={error} />}
      </div>
      {showModal && <DatabaseModal setShowModal={setShowModal} />}
    </div>
  );
};

export default DatabaseContainer;
