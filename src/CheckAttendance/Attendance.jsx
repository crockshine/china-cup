import React, { useEffect, useState } from 'react';
import './Attendance.css';

export default function Attendance() {
  const [code, setCode] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [visitCount, setVisitCount] = useState(0);

  const generateCode = async () => {
    const response = await fetch('/api/generate');
    const data = await response.json();
    setCode(data.code);
    setQrCodeUrl(data.qrCodeUrl);
  };

  const handleScan = async () => {
    // Отправляем запрос на сервер для увеличения счетчика
    await fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }) // Отправляем код для увеличения счетчика
    });

    setVisitCount(prevCount => prevCount + 1); // Увеличиваем локальный счетчик
  };

  useEffect(() => {
    generateCode(); 
    const intervalId = setInterval(generateCode, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <main className="attendance_main">
      <div className="qr_code">
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      </div>
      <div className='text_code'>
        <input 
          type="text"  
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>Количество сканирований: {visitCount}</div>
      <button onClick={handleScan}>Сканировать QR-код</button>
    </main>
  );
}
