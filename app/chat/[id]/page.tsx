import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import CollapseSideBar from "@/components/CollapseSideBar";

type Props = {
    params: {
        id: string;
    };
};

function ChatPage({ params: { id } }: Props) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <CollapseSideBar />
            <Chat chatId={id} />
            <ChatInput chatId={id} />
        </div>
    );
}

export default ChatPage;
