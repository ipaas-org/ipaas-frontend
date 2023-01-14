import { useState, useEffect } from 'react';
import validator from 'validator';

const ApplicationModal = function ({ setShowModal }) {
  const [name, setName] = useState('');
  const [repositoryLink, setRepositoryLink] = useState('');
  const [branch, setBranch] = useState('');
  const [language, setLanguage] = useState('');
  const [port, setPort] = useState('');
  const [enviromentVariablesNumber, setEnviromentVariablesNumber] = useState(0);
  const [enviromentVariables, setEnviromentVariables] = useState({});

  const avaibleLanguage = ['Nodejs', 'Java', 'Rust', 'Go'];

  const handleClose = function (e) {
    if (e.target.classList.contains('closer')) {
      setName('');
      setRepositoryLink('');
      setBranch('');
      setLanguage('');
      setPort('');
      setEnviromentVariablesNumber(0);
      setEnviromentVariables({});
      setShowModal(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className='closer absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-25'
    >
      <div className='custom-shadow max-h-[80%] w-4/5 overflow-y-scroll rounded-xl bg-white px-2 md:px-8 lg:w-1/3'>
        <div className='py-8 text-xl font-semibold'>new application</div>

        <div className='mb-4'>
          <div className='mb-2'>nome del progetto: {name}</div>
          <input
            onChange={e => setName(e.target.value.trimStart())}
            type='text'
            spellCheck='false'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={name}
          />
        </div>
        <div className='mb-6'>
          <div className='mb-1'>repository link:</div>
          <input
            onChange={e => setRepositoryLink(e.target.value)}
            type='text'
            spellCheck='false'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={repositoryLink}
          />
        </div>
        <div className='mb-6'>
          <div className='mb-1'>select branch:</div>
          {validator.isURL(repositoryLink) ? (
            <select
              onChange={e => setBranch(e.target.value)}
              className='w-full rounded border-[1.5px] border-light-gray'
              value={branch}
            >
              <option>master</option>
              <option>frontend</option>
              <option>backend</option>
            </select>
          ) : (
            <select className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
        </div>
        <div className='mb-6'>
          <div className='mb-1'>programming language:</div>
          {avaibleLanguage.length > 0 ? (
            <select
              onChange={e => setLanguage(e.target.value)}
              className='w-full rounded border-[1.5px] border-light-gray'
              value={language}
            >
              {avaibleLanguage.map(language => (
                <option key={language} id={language}>
                  {language}
                </option>
              ))}
            </select>
          ) : (
            <select className='w-full rounded border-[1.5px] border-light-gray' disabled></select>
          )}
        </div>
        <div className='mb-6'>
          <div className='mb-1'>port:</div>
          <input
            onChange={e => setPort(e.target.value)}
            type='number'
            className='w-full rounded border-[1.5px] border-light-gray'
            value={port}
            placeholder='8080'
          />
        </div>
        <div className='mb-4'>
          <div className='mb-1'>environment variables:</div>
          {new Array(enviromentVariablesNumber).fill(0).map((_, index) => (
            <EnviromentVariable
              key={index}
              id={index}
              enviromentVariables={enviromentVariables}
              setEnviromentVariables={setEnviromentVariables}
            />
          ))}
          <button
            onClick={() => setEnviromentVariablesNumber(enviromentVariablesNumber + 1)}
            className='w-full rounded border-[1.5px] border-light-gray py-2 transition-all hover:bg-light-gray'
          >
            new variable
          </button>
        </div>

        <div className='grid grid-cols-2 gap-2 py-6 text-lg  font-semibold'>
          <button onClick={handleClose} className='closer w-full rounded py-2 transition-all hover:bg-light-gray'>
            cancel
          </button>
          <button className='w-full rounded bg-blue py-2 text-white'>create</button>
        </div>
      </div>
    </div>
  );
};

const EnviromentVariable = function ({ enviromentVariables, setEnviromentVariables }) {
  return (
    <div className='mb-2 flex items-center gap-2'>
      <input
        placeholder='VARIABLE_NAME'
        type='text'
        spellCheck='false'
        className='w-full rounded border-[1.5px] border-light-gray'
      />
      <input
        placeholder='somevalue'
        type='text'
        spellCheck='false'
        className='w-full rounded border-[1.5px] border-light-gray'
      />
      <button type='button' className='rounded border-[1.5px] border-light-gray p-2 transition-all hover:bg-light-gray'>
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
  );
};

export default ApplicationModal;
