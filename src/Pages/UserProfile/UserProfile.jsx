import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Event from "../Dashboard/Event";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ModalWindowLoader from "../../Stores/ModalWindowLoader";
import CardInProfile from "./CardInProfile";

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

async function getUserRole() {
  try {
      const token = getToken();
      const response = await fetch('/api/get_user_role', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: token
          }),
      });
      
      const data = await response.json();
      return data.userRole;
  } catch (error) {
      console.log('Ошибка при получении никнейма пользователя:', error);
  }
};

const rolesMap = new Map([
  [5, "Administration"],
  [1, "Student"],
  [2, "Graduate"]
]);

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
  const [userRoleName, setUserRoleName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    async function invoke() {
        ModalWindowLoader.openWindow()

      const userID = await loadUserID();
      const _dashboardContent = await listUserDashboard(userID);

      setUserRoleName(rolesMap.get(await getUserRole()));


      // загружаем инфу о пользователе:
      const _userData = {
        name: await getUserName(),
        nickname: await getUserNickName(),
        email: await getUserMail(),
        techStack: await getUserTechStack()
      };
      setUserData(_userData);


      setDashboardContent(_dashboardContent);
        ModalWindowLoader.closeWindow()

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
      <main className="main_profile w-full  flex h-full overflow-hidden p-5 gap-5">

          <div className="left_bar  achivments_person w-full flex flex-col  items-center text-center">

              <span className="mb-4 font-bold text-2xl sticky">Information</span>

              <div  onClick={handleEditClick} className="profile_user w-full shadow-xl transition rounded-2xl bg-slate-50
                                hover:shadow-2xl hover:-translate-y-1.5 p-4 hover:cursor-pointer ">

                  <div className="profile_data flex flex-row items-center h-1/2 justify-around">
                      <div className="profile_photo w-28 h-28">
                          <img src="/image/defaultProfile.png" alt=""/>
                      </div>

                      <div className="profile_nickname p-5 flex flex-col gap-2 text-start">
                          <p className="user_name text-xl">Name: <span className="font-bold ">{userData.name}</span></p>
                          <p className="user_nickname text-xl">Nickname:<span className="font-bold"> {userData.nickname}</span>                          </p>
                          <p className="user_role text-xl">Stack:<span className="font-bold"> {userData.techStack !== 'null' ? userData.techStack : 'specify'}</span></p>
                      </div>
                      {/*<button className="edit_button">Edit</button>*/}
                  </div>
                  <div className="profile_settings h-1/2 p-4 flex flex-col gap-2">
                      <div className='w-full border'></div>

                      <div className="user_info flex gap-2 text-start">
                          <img src="/image/files.png" alt=""/>
                          <p>{userData.email}</p>
                      </div>
                      <div className="user_info flex gap-2 text-start">
                          <img src="/image/members.jpg" alt=""/>
                          <p>24 Friends</p>
                      </div>
                      <div className="user_info flex gap-2 text-start">
                          <img src="/image/settings.png" alt=""/>
                          <p>Status: {userRoleName}</p>
                      </div>
                  </div>
              </div>

              <div className="block-list w-full h-full flex items-center justify-center">
                  <div className="Blocks   flex flex-wrap gap-4  flex-row items-center justify-center">


                      <CardInProfile text={'Project'} count={21} color={'bg-red-500'}/>
                      <CardInProfile text={'Members'} count={38} color={'bg-pink-400'}/>
                      <CardInProfile text={'Course'} count={3} color={'bg-green-400'}/>
                      <CardInProfile text={'Repositories'} count={12} color={'bg-blue-500'}/>
                      <CardInProfile text={'Chats'} count={4} color={'bg-yellow-400'}/>
                      <CardInProfile text={'Messages'} count={47} color={'bg-orange-500'}/>


                  </div>
              </div>


          </div>

          <div className="right_bar w-full flex flex-col items-center">
              <span className="mb-4 font-bold text-2xl sticky">History</span>
              <div
                  className="profile_events  overflow-y-scroll h-full w-full rounded-2xl shadow-xl bg-slate-50 flex flex-col">

                  <div className="events__profile h-96 w-full bg-slate-50">
                      {Object.keys(dashboardContent).map((key) => {
                          const item = dashboardContent[key];
                          return (
                              <Event
                                  key={key}
                                  image={"/image/defaultProfile.png"}
                                  event_title={item.event}
                                  what_todo={item.name}
                                  time={item.time}
                              />
                          );
                      })}
                  </div>
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
