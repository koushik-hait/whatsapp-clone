import React, { useState, useEffect } from "react";
import Logo from "../../assets/img/logo.svg";
// import "../../assets/scss/contact.scss"

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <>
          {/* <!-- Left --> */}
          <div className="w-1/3 border flex flex-col">

            {/* <!-- Header --> */}
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
              <div>
                <img alt="hfhf" className="w-10 h-10 rounded-full" src={Logo} />
              </div>

              <div className="flex">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                </div>
                <div className="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                </div>
                <div className="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </div>
              </div>
            </div>

            {/* <!-- Search --> */}
            <div className="py-2 px-2 bg-grey-lightest">
              <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat" />
            </div>

            {/* <!-- Contacts --> */}
            <div className="bg-grey-lighter flex-1 overflow-auto">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    onClick={() => changeCurrentChat(index, contact)}
                    className="px-3 flex items-center bg-grey-light cursor-pointer">
                    <div>
                      <img alt="Avatar" className="h-12 w-12 rounded-full"
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                    </div>
                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                      <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">
                          {contact.username}
                        </p>
                        <p className="text-xs text-grey-darkest">
                          12:45 pm
                        </p>
                      </div>
                      <p className="text-grey-dark mt-1 text-sm">
                        last Messages!
                      </p>
                    </div>
                  </div>
                )
              })}

              <div class="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                <div>
                  <img alt="Avatar" class="h-12 w-12 rounded-full"
                    src={`data:image/svg+xml;base64,${currentUserImage}`} />
                </div>
                <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                  <div class="flex items-bottom justify-between">
                    <p class="text-grey-darkest">
                      {currentUserName}
                    </p>
                    <p class="text-xs text-grey-darkest">
                      12:45 pm
                    </p>
                  </div>
                  <p class="text-grey-dark mt-1 text-sm">
                    I'll be back
                  </p>
                </div>
              </div>
            </div>

          </div>
        </>

      )}
    </>
  );
};