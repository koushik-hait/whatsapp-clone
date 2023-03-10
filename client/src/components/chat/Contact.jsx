import React, { useState, useEffect } from "react";
import ContactHeader from "./ContactHeader";
import ContactSearch from "./ContactSearch";


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
            <ContactHeader/>

            {/* <!-- Search --> */}
            <ContactSearch />

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