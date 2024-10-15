import Header from "./Header";
import Profile from "./Profile";

export default function App() {
  return (
    <div className="Window flex flex-col h-screen w-full">
      <div className="max-w-screen-2xl w-full mx-auto flex flex-col h-full">
        <div className="w-full">
          <Header />
        </div>
        <div className="MainContent py-10 px-4 sm:px-8 md:px-16 flex flex-grow gap-4 sm:gap-8 md:gap-16 w-full bg-red-200 h-full">
          {/* Левый сайдбар */}
          <div className="LeftBar w-20 sm:w-48 bg-green-200 border h-full overflow-y-auto">
            {/* Левый контент */}
          </div>
          {/* Правый сайдбар с компонентом Profile */}
          <div className="RightBar flex-grow bg-green-200 border h-full overflow-y-auto">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
