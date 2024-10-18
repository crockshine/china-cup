import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import React from "react";
const SecondModalWindowWrapper = observer(({ isOpenSecond}) => {
    return (
        <div className={`${isOpenSecond ? "block" : "hidden"} z-10 rounded-b-2xl bg-slate-50 absolute flex flex-col shadow-xl mt-3 p-6`}>
            <Link to={'/home/about'}><span>About Us</span></Link>
            <div className="w-full bg-slate-300 h-0.5 my-2 "></div>
            <Link to={'/home/policy'}><span>User Policy</span></Link>
        </div>
    )
        ;
});

export default SecondModalWindowWrapper;