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
    const [disabled, setDisabled] = useState(true)

    console.log(userData);



    const [userRoleName, setUserRoleName] = useState("");
    const navigate = useNavigate();
    const [visibleSlaid, setVisibleSlaid] = useState(1)

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

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(userData);

        navigate(0); // Перезагружает текущую страницу

    };

    // <input
    //     id="file-input"
    //     className="input_image"
    //     type="file"
    //     accept="image/*"
    //     onChange={(e) => setAvatar(e.target.files[0])}
    // />


    const prev = () => {
        if (visibleSlaid === 1) setVisibleSlaid(6)
        else setVisibleSlaid(visibleSlaid - 1)

    }
    const next = () => {
        if (visibleSlaid === 6) setVisibleSlaid(1)
        else setVisibleSlaid(visibleSlaid + 1)

    }

    return (
        <main className=" w-full  flex flex-col h-full overflow-x-hidden overflow-y-scroll p-5 gap-5">

            <div
                className="ProfileInfo  w-full flex flex-col gap-4  p-5 items-center text-center shadow-xl transition rounded-2xl bg-slate-50">

                <span className="font-bold text-2xl flex items-center justify-center">Information</span>

                <div className="Profile w-full h-full flex items-center">
                    <img src="/image/defaultProfile.png" alt="" className="w-32 h-32"/>
                    <div className="Inputs flex flex-col gap-4 w-full">


                        <div className={"w-full text-end"}>
                            <span className={"font-bold"}>Name</span>
                            <input type="text"
                                   className="w-full h-14 border rounded-2xl p-3 font-bold text-xl text-slate-700 outline-blue-600"
                                   value={userData.name}
                                   onChange={(e)=>
                                   {
                                       setDisabled(false)
                                       setUserData({...userData, name: e.target.value})}
                                   }    />
                        </div>

                        <div className={"w-full text-end"}>
                            <span className={"font-bold"}>Nickname</span>
                            <input type="text"
                                   className="w-full h-14 border rounded-2xl p-3 font-bold text-xl text-slate-700 outline-blue-600"
                                   value={userData.nickname}
                                   onChange={(e)=>
                                   {
                                       setDisabled(false)
                                       setUserData({...userData, nickname: e.target.value})}
                                   }    />

                        </div>

                        <div className={"w-full text-end"}>
                            <span className={"font-bold"}>Email</span>
                            <input type="text"
                                   className="w-full h-14 border rounded-2xl p-3 font-bold text-xl text-slate-700 outline-blue-600"
                                   value={userData.email}
                                   onChange={(e)=>
                                   {
                                       setDisabled(false)
                                       setUserData({...userData, email: e.target.value})}
                                   }/>

                        </div>

                        <div className={"w-full text-end"}>
                            <span className={"font-bold"}>Stack</span>
                            <input type="text"
                                   className="w-full h-14 border rounded-2xl p-3 font-bold text-xl text-slate-700 outline-blue-600"
                                   value={userData.techStack}
                                   onChange={(e)=>
                                   {
                                       setDisabled(false)
                                       setUserData({...userData, techStack: e.target.value})}
                                   }/>

                        </div>

                    </div>
                </div>

                <div className={"w-full h-20"}>
                    <button
                        onClick={handleUpdate}
                        disabled={disabled}
                        className={`w-1/3 h-full  rounded-2xl font-bold text-xl text-slate-50 
                        ${disabled ? "disabled bg-sky-200 cursor-auto": "bg-sky-400"}`}>Save change

                    </button>

                </div>


            </div>

            <div className="Blocks  flex flex-wrap gap-4  flex-row items-center justify-center">


                <CardInProfile text={'Project'} count={21} color={'bg-red-500'}/>
                <CardInProfile text={'Members'} count={38} color={'bg-pink-400'}/>
                <CardInProfile text={'Course'} count={3} color={'bg-green-400'}/>
                <CardInProfile text={'Repositories'} count={12} color={'bg-blue-500'}/>
                <CardInProfile text={'Chats'} count={4} color={'bg-yellow-400'}/>
                <CardInProfile text={'Messages'} count={47} color={'bg-orange-500'}/>


            </div>


            <div className="History w-full flex flex-col items-center">

                <span className="mb-4 font-bold text-2xl sticky">History</span>
                <div
                    className="profile_events   w-full rounded-2xl shadow-xl bg-slate-50 flex flex-col">

                    <div className="events__profile rounded-2xl w-full bg-slate-50">
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


        </main>
    );
}
