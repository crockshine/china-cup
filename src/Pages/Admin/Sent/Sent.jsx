import {useAutoAnimate} from "@formkit/auto-animate/react";
import IncomingTaskCard from "../Incoming tasks/IncomingTaskCard";
import {useEffect, useState} from "react";
import SentTaskCard from "./SentTaskCard";
import AdminTask from "../../../Stores/AdminTask";

export default function Sent(){
    const [parent] = useAutoAnimate()

    const [sentTask, setSentTask] = useState([])

    useEffect(() => {
        //получаем отправленные таски и записываем их
        //у таски также должно быть айди и от кого
        setSentTask(AdminTask.getSentTasks())
        //setSentMsg()
    }, []);

    return(
        <div className="TaskList w-full h-full flex flex-col p-2 gap-2 " ref={parent}>
            {sentTask.map(item => {
                    return <SentTaskCard key={item.id} id={item.id} from={item.from} time={item.time}/>
                }
            )}
        </div>
    )
}