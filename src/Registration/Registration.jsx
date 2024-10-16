import './Registration.css';
import { useState } from 'react'; // Импорт useState для работы с состоянием
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const [email, setEmail] = useState(''); // Состояние для почты
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      alert(email);
      alert(password);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMail: email, userPassword: password }), // Отправка данных на сервер
      });

      if (response.ok) {
        // Успешный ответ от сервера
        navigate('/home'); // Переход на страницу '/home' после успешной регистрации
      } else {
        console.error('Ошибка на сервере:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }

    //navigate('/home');
  };

  return(
    <main className="main">
      <div className="center_block">
        <h1 className="reg_label">Registration Form</h1>
        <h2 className="about_label">Please fill out this form with the required information</h2>
        <div className="steps_verification">
            <form className="form" id="loginForm" action="login" method="post" onSubmit = { handleSubmit }>
                <div className="mail_input">
                    <p className='label'>Email</p>
                    <input 
                      className="input" 
                      name="usermail" 
                      id="usermail"
                      value={email} // Значение поля связано с состоянием email
                      onChange={(e) => setEmail(e.target.value)} // Обработчик изменения значения
                      required // Поле обязательно для заполнения
                    />
                </div>
                <div className="password_input">
                    <p className='label'>Password</p>
                    <input 
                      className="input" 
                      name="userpassword" 
                      id="userpassword" 
                      type="password"
                      value={password} // Значение поля связано с состоянием password
                      onChange={(e) => setPassword(e.target.value)} // Обработчик изменения значения
                      required // Поле обязательно для заполнения 
                    />
                </div>
                <input className="submit_button" type="submit" value="Join" />
            </form>
        </div>
      </div>
    </main>
  )
}