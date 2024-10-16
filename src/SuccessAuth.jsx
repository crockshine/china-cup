import Header from "./Header/Header";
import LeftBar from "./LeftBar/LeftBar";
import { Link, Route, Routes} from "react-router-dom";
import Profile from "./Profile/Profile";
import Tasks from "./Tasks/Tasks";
import Messenger from "./Messenger/Messenger";

export default function SuccessAuth(){

    return(
<>
            <Header />

            <div className="MainContent py-10 px-4 sm:px-8 md:px-16 flex flex-grow gap-4 sm:gap-8 md:gap-16 w-full h-full overflow-hidden">

                <div className="LeftBar h-full px-4 sm:px-10 pb-10 w-80  flex flex-col items-center justify-between overflow-auto">
                    <LeftBar/>
                </div>

                <div className="RightBar flex-grow shadow-2xl rounded-2xl bg-slate-50  border h-full overflow-y-auto">
                    <Routes>
                        <Route path='/graduates' element={<Profile/>}></Route>
                        <Route path='/messenger' element={<Messenger/>}></Route>
                        <Route path='/dashboard' element={<Profile/>}></Route>
                        <Route path='/tasks' element={<Tasks/>}></Route>
                        <Route path='/schedule' element={<Profile/>}></Route>
                        <Route path='/files' element={<Profile/>}></Route>
                        <Route path='/' element={<div
                            className="w-full h-full flex flex-col items-center justify-center font-bold text-slate-600 text-4xl">
                            <p>Hello user!</p>
                        </div>}></Route>
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
}