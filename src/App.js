
import Header from "./Header";
import Profile from "./Profile";
export default function App() {

  return (
      <div className="Window flex flex-col h-screen w-screen">
        <Header/>
        <div className="MainContent flex gap-10 h-full w-full bg-red-200">
            <div className="LeftBar h-full w-52 bg-green-200 border" >
            </div>
            <div className="RightBar h-full w-52 bg-green-200 border">
            <Profile/>
            </div>
        </div>
      </div>

  );
}

