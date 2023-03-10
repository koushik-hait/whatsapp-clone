import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
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
        <ChatHeader currentChat={currentChat}/>

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