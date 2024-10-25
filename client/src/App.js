// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [binaryInput, setBinaryInput] = useState('');
  const [decimalOutput, setDecimalOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    
    // Allow only binary input (0s and 1s)
    if (/^[01]*$/.test(value)) {
      setBinaryInput(value);
      setErrorMessage(''); // Clear error message
    } else {
      setErrorMessage('Please enter a valid binary number (only 0s and 1s).');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert binary to decimal
    if (binaryInput) {
      const decimalValue = parseInt(binaryInput, 2);
      setDecimalOutput(decimalValue);
    }
  };

  return (
    <div className="App">
      <h1>Binary to Decimal Converter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={binaryInput}
          onChange={handleChange}
          placeholder="Enter binary number"
        />
        <button type="submit">Convert</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {decimalOutput !== null && (
        <p>Decimal Output: {decimalOutput}</p>
      )}
    </div>
  );
}

export default App;
