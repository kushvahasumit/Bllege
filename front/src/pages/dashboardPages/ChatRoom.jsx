import React, { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { usePostStore } from "../../store/postStore";
import { useNavigate } from "react-router-dom";
import { MessageSquare, LogOut } from "lucide-react";

const ChatRoom = () => {
  const { user } = useAuthStore();
  const { messages, joinRoom, sendMessage, listenForChatMessages } =
    usePostStore();
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (user && user.college) {
      joinRoom(user.college);
      listenForChatMessages();
    }

    return () => {
      socket.off("chatMessage");
    };
  }, [user, joinRoom, listenForChatMessages]);

  // useEffect(() => {
  //   if (messages.length > 0 && chatEndRef.current?.parentElement) {
  //     chatEndRef.current?.parentElement.scrollTo({
  //       top: chatEndRef.current?.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      sendMessage(user.college, messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center p-4 rounded-lg bg-gray-700">
        <h1 className="text-xl font-bold">Chat Room: {user?.college}</h1>
        <button
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => navigate("/mycollege")}
        >
          <LogOut className="mr-2" />
        </button>
      </div>
      <div
        className="flex-grow overflow-y-auto p-4"
        style={{ maxHeight: "calc(70vh - 45px)" }}
      >
        <div className="flex flex-col">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start mb-2">
              <div className="bg-white text-black rounded-lg p-2">
                <p>{msg}</p>
              </div>
            </div>
          ))}

          {/* <div ref={chatEndRef}  /> */}
        </div>
      </div>
      <div className="flex justify-between items-center p-4 pb-60 bg-gray-900">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
          onClick={handleSendMessage}
        >
          <MessageSquare className="mr-1" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
