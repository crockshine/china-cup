import './Registration.css';
import {Link, useNavigate} from "react-router-dom";

export default function Registration(){
    const navigate = useNavigate(); // Хук для навигации

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/home');
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
              <input className="input" name="usermail" id="usermail"/>
              </div>
                <div className="password_input">
                <p className='label'>Password</p>
                <input className="input" name="userpassword" id="userpassword"/>
                </div>
                <Link to={'/home'}><input className="submit_button" type="submit" value="Join" /></Link>
            </form>
        </div>
      </div>
    </main>
  )
}