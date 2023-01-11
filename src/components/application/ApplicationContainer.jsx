import { useEffect, useState } from 'react';
import ApplicationItem from './ApplicationItem';
import ApplicationModal from './ApplicationModal';
import LoadingMessage from '../LoadingMessage';
import ErrorMessage from '../ErrorMessage';

const ApplicationContainer = function () {
  const [applicationItem, setApplicationItem] = useState([0, 1, 2, 3]);
  const [applicationLoading, setApplicationLoading] = useState(false);
  const [applicationError, setApplicationError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchApplicationItems = async function () {
    try {
      setApplicationLoading(true);
      setApplicationError(null);
      const response = await fetch('#');
      const data = await response.json();
      setApplicationItem(data);
    } catch (err) {
      setApplicationError(err);
    } finally {
      setApplicationLoading(false);
    }
  };

  useEffect(() => {
    // fetchApplicationItems();
  }, []);

  return (
    <div className='custom-shadow overflow-hidden rounded-xl md:col-span-8'>
      <div className='h-full w-full divide-y divide-light-gray overflow-y-auto'>
        <div className='flex items-center justify-between px-8 py-6 text-xl font-semibold'>
          <span>Database</span>
          <button onClick={() => setShowModal(true)} className='rounded bg-blue py-1 px-3 text-base text-white'>
            new
          </button>
        </div>
        {applicationLoading && <LoadingMessage />}
        {applicationItem.length > 0 &&
          applicationItem.map((app, index) => <ApplicationItem application={app} key={index} id={index} />)}
        {applicationError && <ErrorMessage message={applicationError} />}
      </div>
      {showModal && <ApplicationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default ApplicationContainer;
