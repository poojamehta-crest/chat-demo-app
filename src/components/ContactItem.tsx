import "../styles/ContactItem.css";
import type { Contact } from "../types";

interface ContactItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
}

const ContactItem = ({ contact, isActive, onClick }: ContactItemProps) => {
  return (
    <div
      className={`contact-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="contact-avatar">
        <img src={contact.avatar} alt={contact.name} />
      </div>
      <div className="contact-info">
        <div className="contact-name">{contact.name}</div>
        <div className="contact-message">{contact.lastMessage}</div>
      </div>
    </div>
  );
};

export default ContactItem;
