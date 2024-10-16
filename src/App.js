import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import LeftBar from "./LeftBar/LeftBar";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

export default function App() {
    return (
      <div className="Window bg-slate-100 flex flex-col h-screen w-screen overflow-hidden" style={{ fontFamily: 'Roboto,sans-serif' }}>
          <Header />

          <BrowserRouter>



            <div className="MainContent py-10 px-4 sm:px-8 md:px-16 flex flex-grow gap-4 sm:gap-8 md:gap-16 w-full h-full overflow-hidden">
                <LeftBar/>


              <div className="RightBar flex-grow shadow-2xl rounded-2xl bg-slate-50  border h-full overflow-y-auto">
                  <Routes>
                          <Route path="*" element={
                              <div className="w-full h-full flex flex-col items-center justify-center font-bold text-slate-600 text-2xl">
                                  <p>No page is selected.</p>
                                  <Link to={'/graduates'}>
                                      <p className="underline">To home</p>
                                  </Link>

                              </div>}/>
                          <Route path="/graduates" element={<Profile />} />

                  </Routes>

              </div>
            </div>
          </BrowserRouter>

      </div>
    );
  }
  