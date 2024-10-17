import './Profile.css';
import Card from './Card';
import { useState } from 'react';

export default function Profile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleActive = (index) => {
    setActiveIndex(index); 
  };
  
  const headers = ['All Users', 'C++', 'C#', 'Full-Stack', 'Frontend', 'Backend'];

  return (
    <div className="Profile h-full">
      <header className="Header flex justify-center items-center  gap-10 h-20 ">
        {headers.map((header, index) => (
          <h1
            key={index}
            className={`header_choose ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleActive(index)}
          >
            {header}
          </h1>
        ))}
      </header>
      <main className="Main">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </main>
    </div>
  );
}
