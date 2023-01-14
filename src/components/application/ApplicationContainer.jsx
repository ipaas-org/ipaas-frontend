import { useState } from 'react';
import ApplicationItem from './ApplicationItem';
import ApplicationModal from './ApplicationModal';
import LoadingMessage from '../LoadingMessage';
import ErrorMessage from '../ErrorMessage';
import useFetch from './../../utils/useFetch'

const ApplicationContainer = function () {
  const { data, loading, error } = useFetch();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='custom-shadow overflow-hidden rounded-xl md:col-span-8'>
      <div className='h-full w-full divide-y divide-light-gray overflow-y-auto'>
        <div className='flex items-center justify-between px-8 py-6 text-xl font-semibold'>
          <span>Application</span>
          <button onClick={() => setShowModal(true)} className='rounded bg-blue py-1 px-3 text-base text-white'>
            new
          </button>
        </div>
        {loading && <LoadingMessage />}
        {data?.application?.map((app, key) => (
          <ApplicationItem application={app} id={key} key={key} />
        ))}
        {error && <ErrorMessage message={error} />}
      </div>
      {showModal && <ApplicationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default ApplicationContainer;
