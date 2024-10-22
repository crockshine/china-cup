import React from "react";
import './LoginWrapper.css'
export default function LoginWrapper({children, switchLoginOrRegistration, submitEvent, text}){
    return (
        <main className="main_registration">
            <div className="center_block ">
                <h1 className="reg_label">{text}</h1>
                <h2 className="about_label">Please fill out this form with the required information</h2>
                <div className="steps_verification flex flex-col">

                    {children}

                </div>
                <div className="flex flex-col mt-10 items-center justify-center">
                    <input className="submit_button mt-8  cursor-pointer" type="submit" onClick={submitEvent}
                           value="Join"/>
                    <input className="reg_button underline mt-8 cursor-pointer" type="submit" onClick={switchLoginOrRegistration}//эмит события
                           value="Don't have an account yet?"/>
                </div>
            </div>
        </main>
    )
}