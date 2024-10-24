
import { useState } from 'react'; // Импорт useState для работы с состоянием
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import LoginWrapper from "./LoginWrapper";

export default function Registration() {
  const [email, setEmail] = useState(''); // Состояние для почты
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [role, setRole] = useState(''); // Состояние для роли
  const [nickname, setNickname] = useState(''); // Состояние для пароля
  const [name, setName] = useState(''); // Состояние для пароля

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

       const data = await response.json();
      console.log(data.token); // Лог ответа сервера
      console.log('Response data:', data);

      if (response.ok) {
        // Успешный ответ от сервера
        // Проверяем наличие куки 'loggedIn'
        if (data.loginState === "true") {
          Cookies.set('loginState', data.loginState);
          Cookies.set('token', data.token, { expires: 1 }); // Сохраняем токен в куки с сроком действия 1 день
        }

        if (data.loginState === "true") {
            navigate('/profile'); // Переход на страницу '/profile' после успешной регистрации
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

  const handleGotoRegistration = (event) => {
    navigate('/registration');
  };

  return(
    <LoginWrapper  switchLoginOrRegistration = {handleGotoRegistration} submitEvent = {handleSubmit} text={'Login form'}>
            <form className="form" id="loginForm" action="login" method="post" >
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

            </form>
    </LoginWrapper>
  )
}