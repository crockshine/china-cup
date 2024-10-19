import React, { useState } from "react";
import "./UserProfile.css";
import Event from "../Dashboard/Event";

function Modal({ isOpen, onClose, onSubmit }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [techStack, setTechStack] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nickname, email, avatar, techStack });
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2 className="modal_label">Edit Profile</h2>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="file-upload">
          <div className="upload_title">
            <p className="image_upload__title">Upload image</p>
        <label htmlFor="file-input" className="custom-file-upload">
          Choose File
        </label>
        </div>
        <input
          id="file-input"
          className="input_image"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>
        <input
          type="text"
          placeholder="Tech Stack"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />
        <div className="modal_buttons">
        <button className="modal_button1" type="submit">Save</button>
        <button className="modal_button2" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default function UserProfile() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Aleksandr",
    nickname: "v0unt",
    email: "example@mail.com",
    techStack: "Full-Stack",
  });

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = (updatedData) => {
    setUserData((prevData) => ({
      ...prevData,
      nickname: updatedData.nickname || prevData.nickname,
      email: updatedData.email || prevData.email,
    }));
  };

  return (
    <main className="main_profile">
      <div className="achivments_person">
        <div className="profile_user">
          <div className="profile_data">
            <div className="profile_photo">
              <img src="/icons/defaultProfile.png" alt="" />
            </div>
            <div className="profile_nickname">
              <p className="user_name">Name: {userData.name}</p>
              <p className="user_nickname">Nickname: {userData.nickname}</p>
              <p className="user_role">Stack: {userData.techStack}</p>
            </div>
            <button onClick={handleEditClick} className="edit_button">Edit</button>
          </div>
          <div className="profile_settings">
            <div className="user_info">
              <img src="/icons/files.png" alt="" />
              <p>{userData.email}</p>
            </div>
            <div className="user_info">
              <img src="/icons/members.jpg" alt="" />
              <p>24 Friends</p>
            </div>
            <div className="user_info">
              <img src="/icons/settings.png" alt="" />
              <p>Status: Student</p>
            </div>
          </div>
        </div>
        <div className="blocks">
        <div className="left_blocks">
          <h1 className="count">21</h1>
          <h2>Projects</h2>
          </div>
          <div className="left_blocks">
          <h1 className="count">38</h1>
          <h2>Members</h2>
          </div>
          <div className="left_blocks">
          <h1 className="count">3</h1>
          <h2>Course</h2>
          </div>
          <div className="left_blocks">
          <h1 className="count">12</h1>
          <h2>Repositories</h2>
          </div>
          <div className="left_blocks">
          <h1 className="count">4</h1>
          <h2>Chats</h2>
          </div>
          <div className="left_blocks">
          <h1 className="count">47</h1>
          <h2>Messages</h2>
          </div>
        </div>
      </div>
      <div className="profile_events">
        <div className="events__profile">
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>
        <Event 
        image={"/icons/defaultProfile.png"}
        event_title={"Added new tasks"}
        what_todo={"Develop a visual concept"}
        time={"15:47"}/>        
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </main>
  );
}
