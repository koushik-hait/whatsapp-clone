import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../../utils/ApiRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    async function sendMsg(){
        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          );
          const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
          });
          setMessages(response.data);
    }
    sendMsg();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="w-2/3 border flex flex-col">

        {/* <!-- Header --> */}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
            </div>
            <div className="ml-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
            </div>
            <Logout />
          </div>
        </div>

        {/* <!-- Messages --> */}
        <div className="flex-1 overflow-auto bg-[#DAD3CC]" >
          <div className="py-2 px-3">

            <div className="flex justify-center mb-2">
              <div className="rounded py-2 px-4 bg-[#DDECF2]" >
                <p className="text-sm uppercase">
                  {new Date(Date.now()).getDay() + "/" + new Date(Date.now()).getMonth() + "/" + new Date(Date.now()).getFullYear()}
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
            {messages.map((message) => {
          return (
            <>
            <div ref={scrollRef} key={uuidv4()}  >
              {message.fromSelf ? (
              <div className="flex mb-2">
                <div className="rounded py-2 px-3 bg-[#F2F2F2]" >
                
                <p className="text-sm mt-1">
                {message.message}
                </p>
                <p className="text-right text-xs text-grey-dark mt-1">
                {message.msgTime}
                  
                </p>
              </div>
              </div> ):( 
              <div className="flex justify-end mb-2">
              <div className="rounded py-2 px-3 bg-[#E2F7CB]" >
              <p className="text-sm text-teal">
                {currentChat.username}
                </p>
                <p className="text-sm mt-1">
                {message.message}
                </p>
                <p className="text-right text-xs text-grey-dark mt-1">
                {message.msgTime}
                </p>
              </div>
            </div>)
            }
            </div>
            </>
          )
          })}
            
          </div>
        </div>

        {/* <!-- Input --> */}
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
      </>
  );
};