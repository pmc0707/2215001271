import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [average, setAverage] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const response = await axios.get('http://20.244.56.144/evaluation-service/fibo', {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY_HERE' 
        }
      });

      const numArray = response.data.numbers;

      if (!Array.isArray(numArray) || numArray.length === 0) {
        setError('Invalid data received from the API.');
        setAverage(null);
        return;
      }

      const avg = numArray.reduce((acc, val) => acc + val, 0) / numArray.length;

      setData(numArray);
      setAverage(avg.toFixed(2));
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data.');
      setAverage(null);
      setData([]);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Average Calculator (Fibonacci API)</h2>
      <button 
        onClick={handleFetch} 
        style={{ marginTop: '10px', padding: '10px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        Fetch & Calculate
      </button>

      {data.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <strong>Numbers:</strong> {data.join(', ')}
        </div>
      )}

      {average !== null && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Average:</strong> {average}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;
