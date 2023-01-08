import { useState, useEffect } from 'react';
const ApplicationModal = function ({ setShowModal }) {
  const [applicationLink, setApplicationLink] = useState('');
  const [applicationBranch, setApplicationBranch] = useState('');
  const [applicationLanguage, setApplicationLanguage] = useState('');
  const [applicationPort, setApplicationPort] = useState('');
  const [applicationDescription, setApplicationDescription] = useState('');

  useEffect(() => {}, []);

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-25'>
      <div className='custom-shadow w-4/5 rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new application</div>
        <div className='mb-6'>
          <div className='mb-2'>repository link:</div>
          <input
            onChange={e => setApplicationLink(e.target.value)}
            type='text'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationLink}
          />
        </div>
        <div className='mb-6'>
          <div className='mb-2'>select branch:</div>
          <select
            onChange={e => setApplicationBranch(e.target.value)}
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationBranch}
          >
            <option>master</option>
            <option>test</option>
            <option>frontend</option>
            <option>backend</option>
          </select>
        </div>
        <div className='mb-6'>
          <div className='mb-2'>programming language:</div>
          <select
            onChange={e => setApplicationLanguage(e.target.value)}
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationLanguage}
          >
            <option>nodejs</option>
            <option>javascript</option>
            <option>rust</option>
            <option>go</option>
          </select>
        </div>
        <div className='mb-6'>
          <div className='mb-2'>repository link:</div>
          <input
            onChange={e => setApplicationPort(e.target.value)}
            type='text'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationPort}
          />
        </div>
        <div className='mb-4'>
          <div className='mb-2'>repository link:</div>
          <input
            onChange={e => setApplicationDescription(e.target.value)}
            type='text'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationDescription}
          />
        </div>

        <div className='grid grid-cols-2 gap-2 py-6 text-lg  font-semibold'>
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

export default ApplicationModal;
