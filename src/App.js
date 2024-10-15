import Header from "./Header";
import Profile from "./Profile";

export default function App() {
  return (
      <div className="Window flex flex-col h-screen w-screen overflow-hidden"
           style={{fontFamily: 'Roboto,sans-serif'}}>
          <Header/>
          <div className="MainContent flex gap-10 h-full w-screen">
              <div className="LeftBar h-full px-10 pb-10 w-80  border flex flex-col items-center justify-around">

                  {/*Переход в профиль*/}
                  <div className=" flex w-full items-center justify-between  ">

                      <img src="../icons/settingsProfile.png" alt="" className="w-12 h-12"/>
                      <img src="../icons/settings.png" alt="" className="w-12 h-12"/>
                  </div>

                  <div className="MainInfo flex flex-col mb-5 items-center">
                      {/*если авы нет добавить стандартную*/}

                      <div
                          className="w-32 h-32  rounded-full mb-5  flex justify-center items-center bg-cover">
                          <img src="../icons/defaultProfile.png" alt="" className="opacity-70"/>
                          <div className="w-36 h-36 border-4 absolute border-amber-500 rounded-full"></div>
                      </div>

                      <img src="" alt=""/>
                      {/*Из сервера*/}
                      <span className="Name text-2xl font-black text-slate-900">dasddasdsasa</span>
                      <span className="Mail text-lg font-bold text-slate-500">dasdasd</span>

                  </div>

                  <div className="Card w-full grid grid-row-3 grid-cols-2  justify-center">

                      <div className=" border-t-2 border-l-2 rounded-tl-2xl
                         aspect-square"></div>
                      <div className=" border-l-2 border-t-2 border-r-2 rounded-tr-2xl
                         aspect-square"></div>
                      <div className=" border-t-2 border-l-2
                         aspect-square"></div>
                      <div className=" border-r-2 border-l-2 border-t-2
                         aspect-square"></div>
                      <div className=" border-t-2 border-l-2 border-b-2 rounded-bl-2xl
                         aspect-square"></div>
                      <div className=" border-2 border-b-2 rounded-br-2xl
                         aspect-square"></div>

                  </div>

                  <div className="flex flex-col w-full gap-3">
                      <div className="bg-slate-600 w-full h-16 mt-10"></div>
                      <div className="bg-slate-600 w-full h-16"></div>
                  </div>


              </div>

              <div className="RightBar h-full w-52 bg-green-200 border">
                  <Profile/>
              </div>
          </div>
      </div>
    </div>
  );
}
