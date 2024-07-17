"use client"
import React, { useState } from 'react';

const TesterPage: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleClick = async (buttonName: string) => {
    try {
      const res = await fetch(`/api/tester`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ button: buttonName, input: inputValue }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter some text"
      />
      <button onClick={() => handleClick('happy')}>Happy</button>
      <button onClick={() => handleClick('horny')}>Horny</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default TesterPage;
