const LoadingMessage = function () {
  return (
    <>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </>
  );
};

const LoadingItem = function () {
  return (
    <div className='cursor-pointer px-8 py-6 transition-all hover:bg-hover-blue'>
      <div className='col-span-3'>
        <div className='flex items-center'>
          <div className='mr-2 h-6 w-24 animate-pulse rounded bg-slate-300'></div>
          <h4 className='h-6 w-2/3 animate-pulse rounded bg-slate-300'></h4>
        </div>
        <div className='mt-2 flex items-center gap-1'>
          <div className='h-4 w-4 animate-pulse rounded bg-slate-300'></div>
          <h6 className='h-4 w-24 animate-pulse rounded bg-slate-300'></h6>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
