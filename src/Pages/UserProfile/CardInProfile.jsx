import React from "react";
import './StatisticCard.css'

export default function CardInProfile({count, text, color}){
    return (
        <div className="Card  aspect-square relative overflow-hidden ">
            <div
                className={`w-full h-full flex   flex-col items-center justify-center ${color} rounded-2xl`}>
                <h2 className={`absolute   font-bold text-slate-50 opacity-30
                ${count >= 100 ? "text-6xl" : "text-9xl"}`}>{count}</h2>

                <h2 className={`absolute bottom-2  font-medium text-slate-50
                ${text.length > 10 ? "text-xl" : "text-2xl"}`}>{text}</h2>
            </div>
        </div>
    )
}