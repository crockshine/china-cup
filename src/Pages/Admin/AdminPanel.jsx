import {Link, Outlet, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function AdminPanel(){
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/admin/incoming')
    },[])
    const location = useLocation()
    return(
        <>
            <div className="sticky w-full h-14 shadow-lg flex items-center justify-center">
                <Link to={'/admin/people'}
                      className={` flex flex-1 items-center justify-center font-bold text-base text-slate-500 border-r-4 h-full transition 
                      ${location.pathname.includes('admin/people') ? "bg-slate-50  ":"bg-slate-200 "}`}>People</Link>

                <Link to={'/admin/incoming'}
                      className={` flex flex-1 items-center justify-center font-bold text-base text-slate-500 border-r-4 h-full transition
                      ${location.pathname.includes('admin/incoming') ? "bg-slate-50 ":"bg-slate-200 "}`}>Incoming tasks</Link>

                {/* <Link to={'/admin/sent'}
                      className={` flex flex-1 items-center justify-center font-bold text-base text-slate-500 border-r-4 h-full transition
                      ${location.pathname.includes('admin/sent') ? "bg-slate-50 ":"bg-slate-200  "}`}>Sent tasks</Link> */}

            </div>
            <Outlet />
        </>
    )
}