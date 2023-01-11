import { useState, useEffect } from 'react';
const ApplicationModal = function ({ setShowModal }) {
  const [applicationLink, setApplicationLink] = useState('');
  const [applicationBranch, setApplicationBranch] = useState('');
  const [applicationLanguage, setApplicationLanguage] = useState('');
  const [applicationPort, setApplicationPort] = useState('');
  const [applicationDescription, setApplicationDescription] = useState('');
  const [applicationEnviromentVariable, setApplicationEnviromentVariable] = useState();

  useEffect(() => {}, []);

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-25'>
      <div className='custom-shadow max-h-[80%] w-4/5 overflow-y-scroll rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new application</div>
        <div className='mb-6'>
          <div className='mb-1'>repository link:</div>
          <input
            onChange={e => setApplicationLink(e.target.value)}
            type='text'
            spellCheck='false'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationLink}
          />
        </div>
        <div className='mb-6'>
          <div className='mb-1'>select branch:</div>
          <select
            onChange={e => setApplicationBranch(e.target.value)}
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationBranch}
            disabled
          >
            <option>master</option>
            <option>test</option>
            <option>frontend</option>
            <option>backend</option>
          </select>
        </div>
        <div className='mb-6'>
          <div className='mb-1'>programming language:</div>
          <select
            onChange={e => setApplicationLanguage(e.target.value)}
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationLanguage}
            disabled
          >
            <option>nodejs</option>
            <option>javascript</option>
            <option>rust</option>
            <option>go</option>
          </select>
        </div>
        <div className='mb-6'>
          <div className='mb-1'>port:</div>
          <input
            onChange={e => setApplicationPort(e.target.value)}
            type='text'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationPort}
          />
        </div>
        <div className='mb-6'>
          <div className='mb-1'>environment variables:</div>
          <div className='mb-2 flex items-center gap-2'>
            <input
              // onChange={e => setApplicationDescription(e.target.value)}
              placeholder='VARIABLE_NAME'
              type='text'
              spellCheck='false'
              className='w-full rounded border-[1.5px] border-light-gray'
              // value={applicationDescription}
            />
            <input
              // onChange={e => setApplicationDescription(e.target.value)}
              placeholder='somevalue'
              type='text'
              spellCheck='false'
              className='w-full rounded border-[1.5px] border-light-gray'
              // value={applicationDescription}
            />
            <button
              type='button'
              className='rounded border-[1.5px] border-light-gray p-2 transition-all hover:bg-light-gray'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                className='h-6 w-6 fill-none stroke-gray'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          </div>
          <button className='w-full rounded border-[1.5px] border-light-gray py-2 transition-all hover:bg-light-gray'>
            new variable
          </button>
        </div>

        {/* <div className='mb-4'>
          <div className='mb-2'>descrizione del progetto:</div>
          <input
            onChange={e => setApplicationDescription(e.target.value)}
            type='text'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={applicationDescription}
          />
        </div> */}

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
