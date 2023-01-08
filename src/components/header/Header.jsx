const Header = function () {
  return (
    <header className='grid grid-cols-2 pt-8 pb-5'>
      <div className='flex items-center md:text-lg pb-1 font-medium'>Itis Paleocapa As A Service</div>
      <div>
        <div className='flex items-center justify-end'>
          <p className='mr-8 md:text-lg'>Adriano rampoldi</p>
          <button onClick={() => alert('user profile clicked')} className='h-10 w-10 overflow-hidden rounded-full border-2 transition-all hover:border-blue'>
            <img className='object-cover' src='https://picsum.photos/400' alt='user profile picture' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
