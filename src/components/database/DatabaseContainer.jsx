import { useEffect, useState } from 'react';
import DatabaseItem from './DatabaseItem';
import DatabaseModal from './DatabaseModal';
import LoadingMessage from '../LoadingMessage';
import ErrorMessage from '../ErrorMessage';

const DatabaseContainer = function () {
  const [databaseItem, setDatabaseItem] = useState([]);
  const [databaseLoading, setDatabaseLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDatabaseItems = async function () {
    try {
      setDatabaseLoading(true);
      setDatabaseError(null);
      const response = await fetch('#');
      const data = await response.json();
      setDatabaseItem(data);
    } catch (err) {
      setDatabaseError(err);
    } finally {
      setDatabaseLoading(false);
    }
  };

  useEffect(() => {
    // fetchDatabaseItems();

    setDatabaseItem([0, 1]);
    setDatabaseLoading(false);
  }, []);

  return (
    <div className='custom-shadow overflow-hidden rounded-xl md:col-span-4'>
      <div className='h-full w-full divide-y divide-light-gray overflow-y-auto'>
        <div className='flex items-center justify-between px-8 py-6 text-xl font-semibold'>
          <span>Database</span>
          <button onClick={() => setShowModal(true)} className='rounded bg-blue py-1 px-3 text-base text-white'>
            new
          </button>
        </div>
        {databaseLoading && <LoadingMessage />}
        {databaseItem.length > 0 &&
          databaseItem.map((db, index) => <DatabaseItem database={db} key={index} id={index} />)}
        {databaseError && <ErrorMessage message={databaseError} />}
      </div>
      {showModal && <DatabaseModal setShowModal={setShowModal} />}
    </div>
  );
};

export default DatabaseContainer;
