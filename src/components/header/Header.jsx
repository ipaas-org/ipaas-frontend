import { useState } from "react";
import { API } from "../../utils/api";
import STORE from "../../utils/store";
import { getAccessToken } from "../../utils/tokens";
import HeaderModal from "./HeaderModal";
import { LoadingName, LoadingProfilePicture } from "../LoadingMessage";

/*
"code": "1233e57e-d6d2-43b8-b8ad-8645c81ef727",
"networkId": "552904b0bcc0a7bd4bfc5de3b75bdce207be65f1f6f6ffa33bee378f0f8bff44",
"role": "user",
"userSettings": {
    "theme": "light"
},
"userInfo": {
    "username": "Vano2903",
    "name": "davide vanoncini",
    "email": "davidevanoncini2003@gmail.com",
    "pfp": "https://avatars.githubusercontent.com/u/39943465?v=4",
    "githubUrl": "https://api.github.com/users/Vano2903"
}
*/
const getUserInfo = async function (setUser) {
  let accessToken = getAccessToken();
  // await sleep(5)
  API.get("user/info", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      console.log(response.data.data);
      setUser(response.data.data);
      STORE.Storage.SetObject("user", response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Header = function ({ setLoggedIn }) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(STORE.Storage.GetObject("user"));
  if (user === undefined) {
    getUserInfo(setUser);
  }

  return (
    <header className="grid grid-cols-2 pt-8 pb-5">
      <div className="flex items-center pb-1 font-medium md:text-lg">
        Cargoway
      </div>
      <div>
        <div className="flex items-center justify-end">
          <p className="mr-8 md:text-lg">
            {user ? user.userInfo.username : <LoadingName />}
          </p>

          {user ? (
            <button
              onClick={() => setShowModal(true)}
              className="h-10 w-10 overflow-hidden rounded-full border-2 transition-all hover:border-blue"
            >
              <img
                className="object-cover"
                src={user.userInfo.pfp}
                alt="user profile picture"
              />
            </button>
          ) : (
            <LoadingProfilePicture />
          )}
        </div>
      </div>
      {showModal && (
        <HeaderModal
          user={user}
          setShowModal={setShowModal}
          setLoggedIn={setLoggedIn}
        />
      )}
    </header>
  );
};

export default Header;
