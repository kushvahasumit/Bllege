import React, { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { usePostStore } from "../../store/postStore";
import { useNavigate } from "react-router-dom";
import { MessageSquare, LogOut } from "lucide-react";
import { format, isValid } from "date-fns";

const ChatRoom = () => {
  const { user } = useAuthStore();
  const { messages, joinRoom, sendMessage, listenForChatMessages, leaveRoom } =
    usePostStore();
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
console.log("chat Response", messages);

  useEffect(() => {
    if (user && user.college) {
      joinRoom(user.college);
      listenForChatMessages();
    }

    return () => {
      socket.off("chatMessage");
    };
  }, [user, joinRoom, listenForChatMessages]);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = {
        sender: user.name,
        content: messageInput,
        timestamp: new Date().toISOString(), // Store current date and time
      };
      sendMessage(user.college, newMessage);
      setMessageInput("");
    }
  };

  const handleLeaveRoom = () => {
    navigate("/mycollege");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9F9F9] border text-[#2E2E2E] rounded-lg">
      <div className="flex justify-between items-center p-4 rounded-t-lg bg-[#2E2E2E]">
        <h1 className="text-xl font-bold text-[#F9F9F9]">
          Join {user?.college} conversation
        </h1>
        <button
          className="flex items-center bg-lostSouls hover:bg-[#3BA488] text-white px-3 py-1 rounded"
          onClick={handleLeaveRoom}
        >
          <LogOut className="mr-2" />
        </button>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto custom-scrollbar p-4 bg-[#F0F0F0]"
        style={{ maxHeight: "calc(100vh - 240px)" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              msg.sender === user?.name ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative p-1 w-auto rounded-lg shadow-md inline-block  ${
                msg.sender === user?.name
                  ? "bg-[#3D3D3D] text-[#F9F9F9]"
                  : "bg-[#E6E6E6] text-[#2E2E2E]"
              }`}
              style={{ minWidth: "150px", maxWidth: "75%" }}
            >
              <p className="font-semibold text-xs text-gray-400">
                {msg.sender}
              </p>
              <p className="text-sm  leading-relaxed break-words mb-3">
                {msg.content}
              </p>
              <span className="text-xs text-gray-400 absolute bottom-1 right-2">
                {isValid(new Date(msg.timestamp))
                  ? format(new Date(msg.timestamp), "p, MMM dd")
                  : "Invalid date"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-[#2E2E2E]">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow bg-[#F0F0F0] text-[#2E2E2E] px-4 py-2 rounded-l focus:outline-none"
        />
        <button
          className="bg-lostSouls hover:bg-[#3BA488] text-white px-4 py-2 rounded-r flex items-center"
          onClick={handleSendMessage}
        >
          <MessageSquare className="mr-1" />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
