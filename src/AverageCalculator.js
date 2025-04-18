import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://20.244.56.144/evaluation-service';

const endpoints = {
  fibo: 'fibo',
  even: 'even',
  prime: 'primes',
  rand: 'rand'
};

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGfpbXMiOnsiZXhwIjoxNzQzNTc0MzQ0LCJpYXQiOjE3NDM1NzQwNDQsImIzcyI6IkFmZm9yZG1lZCI5Imp0cNDhNS04ZDU5LThiMWJlZmE4MTZkYSIsInNlY1Yi6InJhbHtyaXNobmFAYWJjLmVkdsJ9LCJlbWFpbCI6InJhbHtyaXNobmFAYWJjLmVkdsIsIm5hbWUiOiJyW0ga3Jpc2huyYSIsInJvbGVyOiImFhMJiiwiYWNjZXNzQ29kZS6InhnQXNOQyIsImNsaWVudEljoiZDljYmI2OTktNmEyN0ONE1LThkNTktoGlXYmVmYTgxNmRhiIwiV2xpZW50U2VuYcmV0joidFZKWFhuKJTZvhJulhlTSJ9.YApD98gq0IN_0Ww7JMfmuUfK1m4hLTm7AlcLDcLAZvG'; 

const AverageCalculator = () => {
  const [results, setResults] = useState({
    fibo: { data: [], average: null, error: '' },
    even: { data: [], average: null, error: '' },
    prime: { data: [], average: null, error: '' },
    rand: { data: [], average: null, error: '' },
  });

  const fetchAndCalculate = async (type) => {
    try {
      const response = await axios.get(`${API_BASE}/${endpoints[type]}`, {
        headers: {
          'Authorization': authToken
        }
      });

      const nums = response.data.numbers;

      if (!Array.isArray(nums) || nums.length === 0) {
        throw new Error('Invalid or empty data received from API.');
      }

      const avg = nums.reduce((sum, val) => sum + val, 0) / nums.length;

      setResults(prev => ({
        ...prev,
        [type]: {
          data: nums,
          average: avg.toFixed(2),
          error: ''
        }
      }));
    } catch (err) {
      setResults(prev => ({
        ...prev,
        [type]: {
          data: [],
          average: null,
          error: err.response?.data?.error || err.message || 'Failed to fetch data.'
        }
      }));
    }
  };

  const renderSection = (label, type) => (
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '6px' }}>
      <h3>{label}</h3>
      <button
        onClick={() => fetchAndCalculate(type)}
        style={{
          padding: '10px 16px',
          cursor: 'pointer',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Fetch & Calculate
      </button>

      {results[type].data.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <strong>Numbers:</strong> {results[type].data.join(', ')}
        </div>
      )}

      {results[type].average !== null && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          <strong>Average:</strong> {results[type].average}
        </div>
      )}

      {results[type].error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <strong>Error:</strong> {results[type].error}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Average Calculator (Fibonacci, Even, Prime, Random)</h2>
      {renderSection('Fibonacci Numbers', 'fibo')}
      {renderSection('Even Numbers', 'even')}
      {renderSection('Prime Numbers', 'prime')}
      {renderSection('Random Numbers', 'rand')}
    </div>
  );
};

export default AverageCalculator;
