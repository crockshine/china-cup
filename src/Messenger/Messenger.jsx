import ShortMsg from "./ShortMsg";
import "./Messenger.css"
import Messege from "./Messege";
import {useState} from "react";
export default function Messenger(){
    const [value, setValue] = useState('');

    const handleInput = (event) => {
        setValue(event.target.value);
        event.target.style.height = 'auto'; // сбрасываем высоту перед измерением
        event.target.style.height = `${event.target.scrollHeight}px`; // устанавливаем высоту в зависимости от содержимого
    };
    const handlePress = (event) => {
        if (event.key === 'Enter'){
            if (!event.shiftKey) {
                console.log('enter');
            }

        }
    }
    const sendData  = ()=>{
        setValue()
    }
    return(
        <div className="Messenger h-full ">
            
            <div className="Left max-w-sm gr ">
                <div className="StaticInput  sticky top-0 w-full h-16 pl-4 flex items-center justify-center shadow">
                    <img src="../icons/search.png" alt="" className="w-10 h-10"/>
                    <input type="text" className="w-full outline-0 h-full px-4 text-base sm:text-lg font-bold text-slate-500" placeholder="Search in Messages"/>
                </div>

                <div className="Chat-list   grid-cols-1 overflow-x-hidden">


                    <ShortMsg isActive={true} />
                    <ShortMsg/>
                    <ShortMsg/>
                    <ShortMsg/>

                </div>
            </div>
            <div className="Chat  bg-slate-100 overflow-scroll overflow-x-hidden ">
                <div
                    className="w-full h-12 bg-slate-50 flex items-center border-b-2 sticky top-0 justify-center text-base sm:text-lg font-bold text-slate-700">adsdas
                </div>
                    <div className="Messege-list flex flex-col-reverse">
                        <Messege isSend={true}
                                 text={'1Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={false}
                                 text={'2Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={true}
                                 text={'3Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={false}
                                 text={'4Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={true}
                                 text={'5Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={true}
                                 text={'6Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={false}
                                 text={'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={true}
                                 text={'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={false}
                                 text={'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>
                        <Messege isSend={true}
                                 text={'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов '}/>

                    </div>

                <div className="w-full bg-slate-50 flex sticky justify-center items-center  bottom-0 ">
                <textarea
                    value={value}
                    onInput={handleInput}
                    onKeyDown={handlePress}
                    className="w-full max-h-40 min-h-8 outline-0 resize-none  p-3   text-base sm:text-lg font-bold text-slate-700" type='text'
                    placeholder="Write a message">
                </textarea>
                    <img src="../icons/send.png" alt="" className='w-10 h-10' onClick={sendData}/>
                </div>
            </div>

        </div>
    )
}