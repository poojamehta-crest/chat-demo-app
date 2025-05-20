import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatArea from "./ChatArea";
import ProfileSidebar from "./ProfileSidebar";
import MobileNav from "./MobileNav";
import "../styles/ChatInterface.css";

const ChatInterface = () => {
  const [activeContact, setActiveContact] = useState({
    id: 1,
    name: "Helena Hills",
    status: "Active 20m ago",
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b4457b8d5582a7062874acc551f65cf2cfb9ac77",
    lastMessage: "Will head to the Help Center...",
  });

  const [mobileView, setMobileView] = useState<"contacts" | "chat">("contacts");

  const handleContactSelect = (contact: typeof activeContact) => {
    setActiveContact(contact);
    setMobileView("chat");
  };

  const handleBackToContacts = () => {
    setMobileView("contacts");
  };

  return (
    <div className="chat-container">
      <MobileNav currentView={mobileView} onViewChange={setMobileView} />

      <Sidebar
        activeContact={activeContact}
        setActiveContact={handleContactSelect}
        isVisible={mobileView === "contacts"}
      />

      <ChatArea
        contact={activeContact}
        onBackClick={handleBackToContacts}
        isVisible={mobileView === "chat"}
      />

      <ProfileSidebar contact={activeContact} />
    </div>
  );
};

export default ChatInterface;
