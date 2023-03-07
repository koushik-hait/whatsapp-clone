
// import "../../assets/css/chat.css";
import ChatList from '../components/ui/ChatList';
import ChatDetails from '../components/ui/ChatDetails';


export default function Chat() {
    document.title = "Chat";
    

    return (
        <>
            {/* <!-- component --> */}
            <div>
                <div className="w-full h-32 bg-[#449388]" ></div>

                <div className="container mx-auto mx-[-128px]" >
                    <div className="py-6 h-screen">
                        <div className="flex border border-grey rounded shadow-lg h-full">

                            {/* <!-- Left --> */}
                            <ChatList />


                            {/* <!-- Right --> */}
                            <ChatDetails />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
