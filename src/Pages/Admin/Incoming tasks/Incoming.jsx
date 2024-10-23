import {useAutoAnimate} from "@formkit/auto-animate/react";
import TaskCard from "./TaskCard";
import {useEffect, useState} from "react";
import AdminTask from "../../../Stores/AdminTask";

export default function Incoming(){
    const [parent] = useAutoAnimate()

    //нам надо айди задачи , от кого и даты по желанию
    const [incoming, setIncoming] = useState([])

    useEffect(() => {
        setIncoming(AdminTask.getIncomingTasks())

    }, [AdminTask.incomingTasks]);



    return(
        <div className="TaskList w-full h-full flex flex-col p-2 gap-2 " ref={parent}>

            {incoming.map(item =>  <TaskCard  key={item.id} id={item.id} from={item.from} time={item.time} setIncoming={setIncoming}/>)}

        </div>
    )
}