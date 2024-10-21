import React from "react";
import './LoginWrapper.css'
export default function LoginWrapper({children, handleEvent}){
    return (
        <main className="main_registration">
            <div className="center_block ">
                <h1 className="reg_label">Registration Form</h1>
                <h2 className="about_label">Please fill out this form with the required information</h2>
                <div className="steps_verification flex flex-col">

                    {children}

                </div>
                <div className="flex flex-col mt-10 items-center justify-center">
                    <input className="submit_button mt-8  " type="submit"
                           value="Join"/>
                    <input className="reg_button underline mt-8" type="submit" onClick={handleEvent}//эмит события
                           value="Don't have an account yet?"/>
                </div>
            </div>
        </main>
    )
}