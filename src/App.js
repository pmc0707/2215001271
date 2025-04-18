import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberList = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    try {
      const res = await axios.post('http://localhost:5000/average', { numbers: numberList });
      setAverage(res.data.average);
      setError('');
    } catch (err) {
      setAverage(null);
      setError(err.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {average !== null && <h2>Average: {average}</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;