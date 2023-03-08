import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/ApiRoutes";
import ChatContainer from "../components/chat/ChatContainer";
import Contacts from "../components/chat/Contact";
import Welcome from "../components/chat/Wellcome";


export default function Chat() {
    document.title = "Chat";
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        async function setUser() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            } else {
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                    )
                );
            }
        }
        setUser();
    }, []);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect(() => {
        async function setChat() {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        }
        setChat();
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <>
            {/* <!-- component --> */}
            <div>
                <div className="w-full h-32 bg-[#449388]" ></div>
                <div className="container mx-auto my-[-128px]" >
                    <div className="py-6 h-screen">
                        <div className="flex border border-grey rounded shadow-lg h-full">
                            <Contacts contacts={contacts} changeChat={handleChatChange} />

                            {/* <!-- Right --> */}
                            {currentChat === undefined ? (
                                <Welcome />
                            ) : (
                                <ChatContainer currentChat={currentChat} socket={socket} />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
