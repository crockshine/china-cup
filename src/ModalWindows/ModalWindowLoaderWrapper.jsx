import {observer} from "mobx-react-lite";

const ModalWindowLoaderWrapper = observer(({ isOpen}) => {
    return (
        <div className={`${isOpen ? "block" : "hidden"} left-0 w-screen h-screen backdrop-blur-md  z-30 absolute `}>
            <div className={`  absolute flex  w-full h-full items-center justify-center   opacity-70 z-30`}>
                <img src="/image/Loader.gif" alt=""/>
            </div>

        </div>
    )
        ;
});

export default ModalWindowLoaderWrapper;