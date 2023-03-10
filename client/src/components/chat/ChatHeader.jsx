import React, {useState} from 'react'
import Logout from "./Logout";
import { Link } from "react-router-dom";
import {MdVideocam} from "react-icons/md"


const ChatHeader = (currentChat) => {
    const [toggle, setToggle] = useState(false)
  return (
    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
          <div className="flex items-center">
            <div>
              <img alt="" className="w-10 h-10 rounded-full" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
            </div>
            <div className="ml-4">
              <p className="text-grey-darkest">
              {currentChat.username}
              </p>
              <p className="text-grey-darker text-xs mt-1">
                DP Status! or Bussiness account
              </p>
            </div>
          </div>

          <div className="flex">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
            </div>
            <div className="ml-6">
                <Link to="/call"><MdVideocam /></Link>
                
            </div>
            <div className="ml-6">
                <span onClick={(e)=>{setToggle(!toggle)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                </span>
                {toggle && (
                    <div class="absolute right-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-0">Contact Info</li>
                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-1">Close Chat</li>

                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-2">Delete Chat</li>
                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-2">Mute Notification</li>
                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-2">Report</li>
                            <li className="hover:bg-gray-300 text-gray-700 block px-4 py-2 text-sm cursor-pointer" id="menu-item-2">Block</li>
                            <Logout />
                        </div>
                    </div>
                )}
            </div>
           
          </div>
        </div>
  )
}

export default ChatHeader