import './Registration.css';
import { useState } from 'react'; // Импорт useState для работы с состоянием
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

export default function Registration() {
  const [email, setEmail] = useState(''); // Состояние для почты
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Хук для навигации

  useEffect(() => {
    // Проверяем наличие куки 'loggedIn'
    const loginState = Cookies.get('loginState');
    const token = Cookies.get('token');

    if (loginState == "true" &&  token) {
      navigate('/home');
    }

  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userMail: email,
            userPassword: password
        }),
       });
//npm run build
      const data = await response.json();
      console.log(data.token); // Лог ответа сервера
      console.log('Response data:', data);

      if (response.ok) {
        // Успешный ответ от сервера
        // Проверяем наличие куки 'loggedIn'
        if (data.loginState === "true") {
          Cookies.set('loginState', data.loginState);
          Cookies.set('token', data.token);
        }

        if (data.loginState === "true") {
            navigate('/home'); // Переход на страницу '/home' после успешной регистрации
            // Здесь вы можете добавить логику для обработки успешного входа
        } else {
            // Если пользователь не залогинен, перенаправляем на страницу входа
            navigate('/');
        }
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
            <form className="form" id="loginForm" action="login" method="post" onSubmit={handleSubmit}>
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
                <div className="role_input">
                    <p className='label'>Role</p>
                    <select
                        className="input"
                        name="role"
                        id="role"
                        value={email} // Значение поля связано с состоянием email
                        onChange={(e) => setEmail(e.target.value)} // Обработчик изменения значения
                        required // Поле обязательно для заполнения
                    >
                        <option>
                            Administration
                        </option>
                        <option>dasdas</option>
                        <option>dasdasd</option>

                    </select>
                </div>
                <div className="nickname_input">
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
                <div className="name_input">
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
                <input className="submit_button" type="submit" value="Join"/>
            </form>
        </div>
      </div>
    </main>
  )
}