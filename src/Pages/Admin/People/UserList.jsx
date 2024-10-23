import CardInAdminPanel from "./CardInAdminPanel";
import {useEffect, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

export default function UserList(){
    const [allUsers, setAllUsers] = useState([
        {name:'пидорас'},
        {name: 'еще один'}
    ])
    useEffect(()=>{
        //загружаем данные всех юзеров
        //записываем в setAllUsers
    },[])

    const findPeople = () => {
        //ищем таких юзеров
        //записываем в setAllUsers
    }
    const [parent] = useAutoAnimate()

    return (
        <>
            <div className="sticky top-0 w-full flex justify-center">
                <input type="text" placeholder="Find people" className="h-10 rounded-b-2xl outline-none p-4 shadow-md"
                onClick={findPeople}/>
            </div>

            <div className="UserList w-full h-full flex flex-col p-2 gap-2 " ref={parent}>
                {allUsers.map(item => <CardInAdminPanel name = {item.name}/>)}


            </div>
        </>
    )
}