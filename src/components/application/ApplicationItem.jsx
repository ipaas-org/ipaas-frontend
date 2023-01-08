const ApplicationItem = function ({ application, id }) {
  return (
    <div
      onClick={() => alert('application item')}
      className='grid cursor-pointer grid-cols-4 px-8 py-6 transition-all hover:bg-hover-blue'
      key={application}
    >
      <div className='col-span-3'>
        <div className='flex items-center gap-4'>
          <div className='h-6 w-6'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              className='h-full w-full fill-none stroke-black'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <h4 className='truncate text-ellipsis text-lg'>Lorem ipsum dolor sit amet.</h4>
        </div>
        <div className='mt-1 flex items-center gap-1'>
          <div className='h-4 w-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={2}
              className='h-full w-full fill-none stroke-gray'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </div>
          <h6 className='text-sm text-gray'>Private</h6>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        <span
          onClick={e => {
            alert('application: ' + id);
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

export default ApplicationItem;
