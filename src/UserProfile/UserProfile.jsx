import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Event from "../Dashboard/Event";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function getToken() {
  return Cookies.get('token');
}

async function getUserName() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_name', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });

      const data = await response.json();
      return String(data.userName);
      
  } catch (error) {
      console.log('Ошибка при получении имени пользователя:', error);
  }
};

async function getUserMail() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_mail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });

      const data = await response.json();
      return String(data.userMail);
      
  } catch (error) {
      console.log('Ошибка при получении имени пользователя:', error);
  }
};

async function getUserNickName() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_nickname', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });
      
      const data = await response.json();
      return String(data.userNickName);
  } catch (error) {
      console.log('Ошибка при получении никнейма пользователя:', error);
  }
};

async function getUserTechStack() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_techstack', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });
      
      const data = await response.json();
      console.log('keek: ', data);

      return String(data.userTechStack);
  } catch (error) {
      console.log('Ошибка при получении никнейма пользователя:', error);
  }
};

async function listUserDashboard(__id) {
  try {
      const response = await fetch('/dashboard_api/load_dashboard', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: __id
          }),
      });

      const data = await response.json();
      return data.dashboardContent;
  } catch (error) {
      console.log('Ошибка при получении имени пользователя:', error);
  }
};

async function loadUserID() {
  try {
      const token = getToken();
      const response = await fetch('/messenger_api/get_user_id', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });

      const data = await response.json();
      return data.userID;
  } catch (error) {
      console.log('Ошибка при получении имени пользователя:', error);
  }
};

async function setUserData(_nickname, _email, _techStack) {
  try {
      const token = getToken();
      const response = await fetch('/api/set_user_data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            nickname: _nickname,
            email: _email,
            techStack: _techStack
          }),
      });

      const data = await response.json();
      return data;
  } catch (error) {
      console.log('Ошибка при получении имени пользователя:', error);
  }
};

function Modal({ isOpen, onClose, onSubmit }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [techStack, setTechStack] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      setNickname(await getUserNickName());
      setEmail(await getUserMail());
      setTechStack(await getUserTechStack());
    }
    invoke();
  }, [navigate]);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nickname, email, avatar, techStack });
    setUserData(nickname, email, techStack);
    onClose();
    navigate(0); // Перезагружает текущую страницу

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

// ============================================
export default function UserProfile() {
  const [dashboardContent, setDashboardContent] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Aleksandr",
    nickname: "v0unt",
    email: "example@mail.com",
    techStack: "Full-Stack",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      const userID = await loadUserID();
      const _dashboardContent = await listUserDashboard(userID);

      // загружаем инфу о пользователе:
      const _userData = {
        name: await getUserName(),
        nickname: await getUserNickName(),
        email: await getUserMail(),
        techStack: await getUserTechStack()
      };
      setUserData(_userData);

      setDashboardContent(_dashboardContent);
    }
    invoke();
  }, [navigate]);

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
          {Object.keys(dashboardContent).map((key) => {
            const item = dashboardContent[key];
            return (
              <Event 
                key={key}
                image={"/icons/defaultProfile.png"}
                event_title={item.event}
                what_todo={item.name}
                time={item.time}
              />
            );
          })}     
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
