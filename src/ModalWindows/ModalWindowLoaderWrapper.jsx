import {observer} from "mobx-react-lite";
import {useEffect} from "react";

const ModalWindowLoaderWrapper = observer(({ isOpen}) => {
    useEffect(()=>{
        const modalElement = document.querySelector('.Modal');
        if (isOpen) {
            modalElement.classList.remove('hidden');
            modalElement.classList.add('block');

            modalElement.classList.remove('opacity-0');
            modalElement.classList.add('opacity-100');
        } else {

            modalElement.classList.remove('opacity-100');
            modalElement.classList.add('opacity-0');

            setTimeout(()=>{
                modalElement.classList.remove('block');
                modalElement.classList.add('hidden');
            },1000)


        }
    },[isOpen])
    return (
        <div className={`Modal left-0 w-full h-full backdrop-blur-xl z-30 absolute `}
        style={{transition: 'opacity 1s ease'}}>

            <div className={`  absolute flex  w-full h-full items-center justify-center  opacity-70 z-30`}>
                <img src="/image/Loader.gif" alt=""/>
            </div>

        </div>
    )
        ;
});

export default ModalWindowLoaderWrapper;