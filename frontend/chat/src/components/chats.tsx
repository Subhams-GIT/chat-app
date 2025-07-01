import { useSelector } from "react-redux";
import { AuthState } from "@/Context/AuthContext";

// Define types for message and conversation structure
interface ChatMessage {
  content: string;
  senderId: number;
  senderName: string;
  sentAt: string;
}

interface Conversation {
  friend: {
    displayName: string;
  };
  messages: ChatMessage[];
}

const Chats = () => {
 const user: any = useSelector((state) => state) as AuthState;
  const chats = user.chatreducers as Conversation[];
 

  return (
    <div className="w-screen min-h-screen  bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-3xl space-y-6">
        {chats.map((chat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 transition hover:shadow-md"
          >
            {/* Friend's name */}
            <p className="text-lg font-semibold text-indigo-700 mb-3">
              {chat.friend?.displayName || "Unknown"}
            </p>

            {/* Messages list */}
            <div className="space-y-2 text-sm text-gray-800">
              {chat.messages.map((msg, j) => (
                <div key={j} className="flex flex-col">
                  <span className="bg-violet-600 w-fit p-2 rounded-2xl">
                    
                    {msg.content}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.sentAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Optional: empty state */}
        {chats.length === 0 && (
          <div className="text-center text-gray-500 italic">
            No chats found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;