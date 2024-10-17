import Registration from "./Registration/Registration";
import SuccessAuth from "./SuccessAuth";
import "./App.css"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

export default function App() {
    return (
      <div className="Window bg-slate-100 flex flex-col h-screen w-screen overflow-hidden" style={{ fontFamily: 'Roboto,sans-serif' }}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Registration/>}/>
                  <Route path='/home/*' element={<SuccessAuth/>}/>
                  <Route path="*" element={
                      <div className="w-full h-full flex flex-col items-center justify-center font-bold text-slate-600 text-2xl">
                          <p>No page is selected.</p>
                          <Link to={'/home'}>
                              <p className="underline">To home</p>
                          </Link>

                      </div>}/>
              </Routes>
          </BrowserRouter>

      </div>
    );
  }
