<<<<<<< HEAD
import Header from "./Header";
import Profile from "./Profile";
import LeftBar from "./LeftBar";
import Registration from "./Registration";
=======
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import LeftBar from "./LeftBar/LeftBar";
>>>>>>> eb4728d3846a278f3de08d043ee73067e7e81bcd

export default function App() {
    return (
      <div className="Window bg-slate-100 flex flex-col h-screen w-screen overflow-hidden">
        <Registration/>
         <Header />
        <div className="MainContent py-10 px-4 sm:px-8 md:px-16 flex flex-grow gap-4 sm:gap-8 md:gap-16 w-full h-full overflow-hidden">
            <LeftBar/>
          <div className="RightBar flex-grow shadow-2xl rounded-2xl bg-slate-50  border h-full overflow-y-auto">
            <Profile />
          </div>
        </div>
      </div>
    );
  }
  