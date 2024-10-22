import './Profile.css';
import Card from './Card';
import { useState } from 'react';
import {useAutoAnimate} from "@formkit/auto-animate/react";

export default function Profile() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleActive = (index) => {
    setActiveIndex(index);
  };

  const headers = ['All Users', 'C++', 'C#', 'Full-Stack', 'Frontend', 'Backend'];

  const users = [
    { name: "Surovtsev Alexandr", stack: "C++", mail: "cstud124851@vyautsu.ru", solutions: 193, work: "Synaptic" },
    { name: "Ivanov Ivan", stack: "C#", mail: "ivanov@mail.com", solutions: 120, work: "TechCorp" },
    { name: "Petrov Petr", stack: "Full-Stack", mail: "petrov@mail.com", solutions: 150, work: "WebSolutions" },
    { name: "Sidorov Sidor", stack: "Frontend", mail: "sidorov@mail.com", solutions: 200, work: "CreativeAgency" },
    { name: "Smith John", stack: "Backend", mail: "smith@mail.com", solutions: 130, work: "DataSystems" },
    { name: "Kuznetsov Alex", stack: "C++", mail: "kuznetsov@mail.com", solutions: 170, work: "AI Labs" },
    { name: "Lebedev Alexey", stack: "Frontend", mail: "lebedev@mail.com", solutions: 85, work: "WebCreatives" },
    { name: "Vasiliev Vasily", stack: "C#", mail: "vasiliev@mail.com", solutions: 95, work: "AppDev" },
    { name: "Fedorov Fedor", stack: "Full-Stack", mail: "fedorov@mail.com", solutions: 110, work: "Global Tech" },
    { name: "Nikolaev Nikolai", stack: "Backend", mail: "nikolaev@mail.com", solutions: 140, work: "Cloud Solutions" },
    { name: "Popov Pavel", stack: "C++", mail: "popov@mail.com", solutions: 165, work: "GameDev Studio" },
    { name: "Borisov Boris", stack: "C#", mail: "borisov@mail.com", solutions: 75, work: "Finance Tech" },
    { name: "Kovalev Kirill", stack: "Frontend", mail: "kovalev@mail.com", solutions: 90, work: "Design Agency" },
    { name: "Morozov Mikhail", stack: "Backend", mail: "morozov@mail.com", solutions: 125, work: "Data Solutions" },
    { name: "Ivanova Elena", stack: "Full-Stack", mail: "ivanova@mail.com", solutions: 105, work: "E-commerce" },
    { name: "Semenov Sergey", stack: "C++", mail: "semenov@mail.com", solutions: 150, work: "Robotics" },
    { name: "Gromov Dmitry", stack: "C#", mail: "gromov@mail.com", solutions: 80, work: "Cyber Security" }
  ];
  

  const selectedStack = activeIndex === 0 ? null : headers[activeIndex];

  const filteredUsers = selectedStack
    ? users.filter(user => user.stack === selectedStack)
    : users;
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  return (
    <div className="Profile h-full overflow-x-hidden overflow-y-scroll">
      <header className="Header flex justify-center items-center gap-10 h-20">
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
      <main className="Main" ref={parent}>
        {filteredUsers.map((user, index) => (
          <Card
            key={index}
            name={user.name}
            stack={user.stack}
            mail={user.mail}
            solutions={user.solutions}
            work={user.work}
          />
        ))}
      </main>
    </div>
  );
}
