import Header from "./Header/Header";
import LeftBar from "./Pages/LeftBar/LeftBar";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import Schedule from "./Pages/Schedule/Schedule.jsx"
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import Tasks from "./Pages/Tasks/Tasks";
import Messenger from "./Pages/Messenger/Messenger.tsx";
import Attendance from "./CheckAttendance/Attendance.jsx";
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import About from "./Header/InfoFields/About";
import Policy from "./Header/InfoFields/Policy";
import AdminPanel from "./Pages/Admin/AdminPanel";
import ModalWindowLoaderWrapper from "./ModalWindows/ModalWindowLoaderWrapper";
import ModalWindowLoader from "./Stores/ModalWindowLoader";
import {observer} from "mobx-react-lite";
import UserList from "./Pages/Admin/People/UserList";
import Incoming from "./Pages/Admin/Incoming tasks/Incoming";
import Sent from "./Pages/Admin/Sent/Sent";

const  SuccessAuth = observer(()=> {
    const navigate = useNavigate();

    useEffect(() => {
        // Проверяем наличие куки 'loggedIn'
        const loginState = Cookies.get('loginState');
        const sessionID = Cookies.get('sessionID');

        //console.log("Kek: ", loginState, sessionID);

        if (loginState != "true") {
            navigate('/authentication');
        }

    }, [navigate]);

    return(
        <>
            <Header />

            <div className="MainContent py-10 px-4 sm:px-8 md:px-16 flex flex-grow gap-4 sm:gap-8 md:gap-16 w-full h-full overflow-hidden">

                <div className="LeftBar h-full px-4 sm:px-10 pb-10 min-w-80 max-w-80  flex flex-col items-center justify-between overflow-hidden ">
                    <LeftBar/>
                </div>

                <div className="RightBar flex-grow shadow-2xl relative rounded-2xl bg-slate-50  border h-full overflow-y-hidden">
                    <ModalWindowLoaderWrapper isOpen={ModalWindowLoader.isOpen} />

                    <Routes>
                        <Route path='/graduates' element={<Profile/>}></Route>
                        <Route path='/messenger/*' element={<Messenger/>}></Route>
                        <Route path='/dashboard' element={<Dashboard/>}></Route>
                        <Route path='/tasks' element={<Tasks/>}></Route>
                        <Route path='/schedule' element={<Schedule/>}></Route>
                        <Route path='/profile' element={<UserProfile/>}></Route>
                        <Route path='/attendance' element={<Attendance/>}></Route>
                        <Route path='/admin' element={<AdminPanel/>}>
                            <Route path={'/admin/people'} element={<UserList/>}></Route>
                            <Route path={'/admin/incoming'} element={<Incoming/>}></Route>
                            <Route path={'/admin/sent'} element={<Sent/>}></Route>


                        </Route>

                        <Route path='/' element={<UserProfile/>}></Route>
                        {/*убрать этот маршрут*/}

                        <Route path={'/about'} element={<About/>}></Route>
                        <Route path={'/policy'} element={<Policy/>}></Route>



                        <Route path='/*' element={
                            <div
                                className="w-full h-full flex flex-col items-center justify-center font-bold text-slate-600 text-2xl">
                                <p>No page is selected.</p>
                                <Link to={'/home'}>
                                    <p className="underline">To home</p>
                                </Link>

                            </div>}/>

                    </Routes>
                </div>

            </div>
        </>
    )
})
export default SuccessAuth