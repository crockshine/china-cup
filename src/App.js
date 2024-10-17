import Registration from "./Registration/Registration";
import Login from "./Registration/Login"
import SuccessAuth from "./SuccessAuth";
import "./App.css"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import ModalWindow from './Stores/ModalWindow'

const  App = observer(() =>{
    return (
        <div className="Window bg-slate-100 flex flex-col h-screen w-screen overflow-hidden"
             style={{fontFamily: 'Roboto,sans-serif'}}>
            <div onClick={ModalWindow.closeWindow} className={`${ModalWindow.isOpen ? "w-screen h-screen bg-blue-600 absolute z-20":"hidden"}` }></div>
            <BrowserRouter>
                <Routes>


                    <Route path='/' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/home/*' element={<SuccessAuth/>}/>
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