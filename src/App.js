import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Registration/Login"
import SuccessAuth from "./SuccessAuth";
import "./App.css"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import ModalWindowWrapper from "./ModalWindows/ModalWindowWrapper";
import ModalWindow from './Stores/ModalWindow'
import ModalWindowLoaderWrapper from "./ModalWindows/ModalWindowLoaderWrapper";
import ModalWindowLoader from "./Stores/ModalWindowLoader"


const  App = observer(() =>{
    return (

        <div className={`Window   bg-slate-100 flex flex-col overflow-hidden `}
             >
            <BrowserRouter>
                <ModalWindowLoaderWrapper isOpen={ModalWindowLoader.isOpen} />

                <ModalWindowWrapper isOpen={ModalWindow.isOpen} closeWindow={ModalWindow.closeWindow}/>
                <Routes>


                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/*' element={<SuccessAuth/>}/>
                    <Route path="*" element={
                        <div
                            className="w-full h-full flex flex-col items-center justify-center font-bold text-slate-600 text-2xl">
                            <p>No page is selected.</p>
                            <Link to={'/home'}>
                                <p className="underline">To home</p>
                            </Link>

                        </div>}/>
                </Routes>

            </BrowserRouter>

        </div>
    );
})
export default App