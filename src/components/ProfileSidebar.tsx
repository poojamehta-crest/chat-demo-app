import "../styles/ProfileSidebar.css";
import type { Contact } from "../types";

interface ProfileSidebarProps {
  contact: Contact;
}

const ProfileSidebar = ({ contact }: ProfileSidebarProps) => {
  return (
    <div className="profile-sidebar">
      <div className="profile-info">
        <div className="profile-avatar">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcfdb5ea536f7c828f0d34ec12ebeebbe16c7f00"
            alt={contact.name}
          />
        </div>
        <div className="profile-name">{contact.name.split(" ")[0]}</div>
        <div className="profile-status">{contact.status}</div>
      </div>

      <div className="profile-actions">
        <button className="profile-view-button">View profile</button>

        <div className="profile-options">
          <div className="profile-option">
            <div
              className="profile-option-icon"
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.9999 21.0004L16.6499 16.6504" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
              }}
            />
            <div className="profile-option-text">Search chat</div>
          </div>

          <div className="profile-option">
            <div
              className="profile-option-icon"
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 15L16 10L5 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
              }}
            />
            <div className="profile-option-text">Sent images</div>
          </div>

          <div className="profile-option">
            <div
              className="profile-option-icon"
              dangerouslySetInnerHTML={{
                __html:
                  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
              }}
            />
            <div className="profile-option-text">More options</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
