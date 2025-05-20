import ContactItem from "./ContactItem";
import "../styles/Sidebar.css";
import type { Contact } from "../types";

interface SidebarProps {
  activeContact: Contact;
  setActiveContact: (contact: Contact) => void;
  isVisible?: boolean;
}

const Sidebar = ({
  activeContact,
  setActiveContact,
  isVisible = true,
}: SidebarProps) => {

  const contacts = [
    {
      id: 1,
      name: "Helena Hills",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4fc3ce3c5f241ae1317a029ca2739b696f1d3a1f",
      lastMessage: "Will head to the Help Center...",
      status: "Active 20m ago",
    },
    {
      id: 2,
      name: "Carlo Emilio",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/da398aee2f07e42aad7c4264940b4f7147d029e2",
      lastMessage: "Let's go",
      status: "Active 1h ago",
    },
    {
      id: 3,
      name: "Oscar Davis",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/02e9b4177263fe056b668f5b19b0e9a6eaa53f5f",
      lastMessage: "Trueeeeee",
      status: "Active 3h ago",
    },
    {
      id: 4,
      name: "Daniel Jay Park",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/62b99a54869ab244f24c6329ec714d3b6b3d923a",
      lastMessage: "lol yeah, are you coming to the lunch on the 13th?",
      status: "Active 5h ago",
    },
    {
      id: 5,
      name: "Mark Rojas",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d01c959e39de7b10ff2989d117d4cccad05d3d64",
      lastMessage: "great catching up over dinner!!",
      status: "Active 1d ago",
    },
    {
      id: 6,
      name: "Giannis Constantinou",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f0c9eee260b5fac7bc7a49d88173abbe413461c7",
      lastMessage: "yep 🫡🫡",
      status: "Active 2d ago",
    },
    {
      id: 7,
      name: "Briana Lewis",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/beb60c3250a176fffabd1857cc57aaf6e83ce51f",
      lastMessage: "When are you coming back to town? Would love to catch up.",
      status: "Active 3d ago",
    },
    {
      id: 8,
      name: "Mom",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f06306b88ea820dec4f624e5a0edb292f9f8c8c4",
      lastMessage: "Thanks!",
      status: "Active 1w ago",
    },
    {
      id: 9,
      name: "Sherry Roy",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/87be232e3322f429888624b6fc9fe7115f20d0d2",
      lastMessage:
        "Jack needs to find a sitter for the dog and I don't know who's good",
      status: "Active 1w ago",
    },
    {
      id: 10,
      name: "John Smith",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ad66f676459ed5f9ea472150c2abb0c180dd916f",
      lastMessage: "sg!",
      status: "Active 2w ago",
    },
  ];

  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <div className="app-title">App</div>
      <div className="search-bar">
        <div className="search-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.9999 21.0004L16.6499 16.6504" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="search-placeholder">Search chats</div>
      </div>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isActive={contact.id === activeContact.id}
            onClick={() => setActiveContact(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
