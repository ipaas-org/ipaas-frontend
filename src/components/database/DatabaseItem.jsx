const DatabaseItem = function ({ database, id }) {
  const state = Math.random() > 0.3 ? 'running' : Math.random() > 0.6 ? 'crashed' : 'paused';
  return (
    <div
      onClick={() => alert('database item')}
      className='grid cursor-pointer grid-cols-4 px-8 py-6 transition-all hover:bg-hover-blue'
      key={database}
    >
      <div className='col-span-3'>
        <div className='flex items-center'>
          {state === 'running' && <div className='mr-2 rounded bg-green-600 px-2 text-sm font-medium text-white'>running</div>}
          {state === 'paused' && <div className='mr-2 rounded bg-yellow-400 px-2 text-sm font-medium text-white'>paused</div>}
          {state === 'crashed' && <div className='mr-2 rounded bg-red-400 px-2 text-sm font-medium text-white'>crashed</div>}

          <h4 className='truncate text-ellipsis text-lg'>database placeholder</h4>
        </div>

        <h6 className='mt-1 text-sm text-gray'>MongoDB</h6>
      </div>
      <div className='flex items-center justify-end'>
        <span
          onClick={e => {
            alert('deleted: ' + id);
            e.stopPropagation();
          }}
          className='rounded-md p-2 hover:bg-light-gray'
        >
          <svg
            className='pointer-events-none h-6 w-6 fill-none stroke-black'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DatabaseItem;
