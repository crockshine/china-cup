import {useAutoAnimate} from "@formkit/auto-animate/react";
import IncomingTaskCard from "./IncomingTaskCard";
import {useEffect, useState} from "react";
import AdminTask from "../../../Stores/AdminTask";
import { useNavigate } from "react-router-dom";

async function uploadUncheckedTasksData() {
    const response = await fetch('/tasks_api/get_unchecked_tasks_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ }),
    });
  
    const data = await response.json();
    return data.data;
}

export default function Incoming(){
    const [parent] = useAutoAnimate();
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setData(await uploadUncheckedTasksData());
        };

        fetchData();
    }, [navigate]);

    const setIncoming = () => {
        
    };

    return(
        <div className="TaskList w-full h-full flex flex-col p-2 gap-2 " ref={parent}>

            {data.map(item =>  <IncomingTaskCard  key={item.id} taskID={item.task_id} userID={item.user_id}
                time={item.time} setIncoming={setIncoming} userComment={item.comment} code={item.code} />)}

        </div>
    )
}