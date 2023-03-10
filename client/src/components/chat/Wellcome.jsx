import React, { useState, useEffect } from "react";
import Robot from "../../assets/img/robot.gif";
import WellcomeIcon from "../../assets/img/real_time_sync.svg"
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    async function setUName(){
        setUserName(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ).username
          );
    }
    setUName()
  }, []);


  return (
   
      <>
      <div className="w-2/3 border flex flex-col">
      <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
          
      </div>

      <div className="flex-1 overflow-auto bg-[#DAD3CC]" >
          <div className="py-2 px-3">

            <div className="flex justify-center mb-2">
              <div className="rounded py-2 px-4 bg-[#DDECF2]" >
                <p className="text-sm uppercase">
               { new Date(Date.now()).getDate() + "/" + new Date(Date.now()).getMonth() + "/" +new Date(Date.now()).getUTCFullYear()}
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="rounded py-2 px-4 bg-[#FCF4CB]" >
                <p className="text-xs">
                  Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                </p>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="rounded py-2 px-4 " >
                <img className="w-[300px] h-[200px]" src={WellcomeIcon} alt="ICON" />
                <h1 className="text-lg text-center font-bold">
                  Whatsapp Web
                </h1>
              </div>
            </div>
            <div className="flex justify-center mb-4">
              <div className="rounded py-2 px-4 " >
              <span className="text-center text-xs uppercase">Wellcome {userName}</span>
              </div>
            </div>
             
          </div>
        </div>
        </div>
         
      
      </>
    
  );
};