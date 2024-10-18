import "./Dashboard.css"
import Leaderboard from "./Leaderboard"
import Event from "./Event"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Dashboard() {
  const [dashboardContent, setDashboardContent] = useState([]);

  const location = useLocation();
  const navigate = useNavigate(); // Хук для навигации
  useEffect(() => {
    async function invoke() {
      const userID = await loadUserID();
      const _dashboardContent = await listUserDashboard(userID);

      setDashboardContent(_dashboardContent);
      console.log("_dashboardContent=", _dashboardContent[1]);
      
    }
    invoke();

  }, [navigate]);

  function getToken() {
    return Cookies.get('token');
  }

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

  return(
    <main className="main_content__dashboard">
      <div className="all_dashboard">
      <div className="left_achievements">
        <div className="left_blocks">
          <h1 className="count">21</h1>
          <h2>Projects</h2>
          </div>
        <div className="left_blocks">
          <h1 className="count">145</h1>
        <h2>Tasks</h2>
        </div>
        <div className="left_blocks">
          <h1 className="count">12</h1>
        <h2>Members</h2>
        </div>
        <div className="left_blocks">
          <h1 className="count">18</h1>
        <h2>Stages</h2></div>
      </div>

      <div className="events">
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

      <div className="leaderboard">
        <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
                <Leaderboard 
        person_name={"Aleksandr Surovtsev"}
        stages_count={4}
        solutions={12}
        stack={"Full-Stack"}
        tasks_count={"5"}/>
      </div>
      </div>
    </main>

  )
}