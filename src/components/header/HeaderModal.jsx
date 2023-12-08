// todo: use state per fare il tema
import STORE from "../../utils/store";
import { deleteTokens } from "../../utils/tokens";


const HeaderModal = function ({user, setShowModal, setLoggedIn }) {
  const handleBackgroundClick = function (e) {
    if (e.target.classList.contains('inset-0')) {
      setShowModal(false);
    }
  };
  return (
    <div onClick={handleBackgroundClick} className='absolute inset-0 z-40 bg-opacity-10'>
      <div className='custom-shadow absolute right-20 mt-20 space-y-4 rounded border-r-4 border-blue bg-white py-6 px-8 text-end text-lg'>
        <div className=''>{user.userInfo.email}</div>
        {/* <div className='cursor-pointer'>theme</div> */}
        <div
          onClick={e => {
            deleteTokens();
            STORE.Storage.DelObject("user");
            window.location.href = "/";
            setLoggedIn(false);
            e.stopPropagation();
          }}
          className='cursor-pointer font-semibold'
        >
          logout
        </div>
      </div>
    </div>
  );
};

export default HeaderModal;
