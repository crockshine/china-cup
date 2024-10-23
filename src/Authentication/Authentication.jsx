import { Navigate, useNavigate } from "react-router-dom";
import "./Authentication.css";
import { useRef, useState } from "react";

export default function Authentication() {
  const inputs = useRef([]);
  const [isCodeVerified, setIsCodeVerified] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (index) => {
    if (inputs.current[index].value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    } else if (inputs.current[index].value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyConfirmationCode = async (confirmationCode) => {
    try {
      const response = await fetch('api/verify-confirmation-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsCodeVerified(false);
        navigate('/');
        
      } else {
        console.error(data.error);
        setIsCodeVerified(true); 
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleVerify = () => {
    const confirmationCode = inputs.current.map(input => input.value).join('');
    verifyConfirmationCode(confirmationCode);
  };

  return (
    <main className="authentication_main">
      <div className="center_main">
        <div className="code-input">
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-box"
              ref={el => (inputs.current[index] = el)}
              onChange={() => handleInputChange(index)}
              aria-label={`Input ${index + 1}`}
            />
          ))}
        </div>
        <button className="add_code__button" onClick={handleVerify}>
          Подтвердить
        </button>
        {isCodeVerified && <p className="verified_code">Код подтверждения неправильный</p>}
      </div>
    </main>
  );
}
