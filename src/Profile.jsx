import './Profile.css';

export default function Profile() {
  return (
    <div className="Profile">
      <header className="Header flex border-2 justify-center items-center gap-10 h-20">
        <span>All Users</span>
        <span>C++</span>
        <span>C#</span>
        <span>Full-Stack</span>
        <span>Frontend</span>
        <span>Backend</span>
      </header>
      <main className="Main">
        {/* Сетка элементов */}
        <div className="square square1"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </main>
    </div>
  );
}
