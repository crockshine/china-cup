import {observer} from "mobx-react-lite";
import LeftBar from "../LeftBar/LeftBar";
const ModalWindowWrapper = observer(({ isOpen, closeWindow }) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"}`}>
            <div onClick = {closeWindow} className={` w-screen h-screen absolute flex items-center justify-center bg-slate-700 opacity-70 z-30`}></div>
            <div className="absolute bg-slate-50 p-10 w-1/2 h-full z-40 flex flex-col">
                <LeftBar />
            </div>
        </div>
)
    ;
});

export default ModalWindowWrapper;