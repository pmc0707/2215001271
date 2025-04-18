import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://20.244.56.144/evaluation-service/';

const endpoints = {
  fibo: 'fibo',
  even: 'even',
  prime: 'primes',
  rand: 'rand'
};

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGlpbXMiOnsiZXhwIjoxNzQzNTc0MzQ0LCJpYXQiOjE3NDM1NzQwNDQsImIzcyI6IkFmZm9yZG1lZCI5Imp0cNDhNS04ZDU5LThiMWJlZmE4MTZkYSIsInNlY1Yi6InJhbHtyaXNobmFAYWJjLmVkdsJ9LCJlbWFpbCI6InJhbHtyaXNobmFAYWJjLmVkdsIsIm5hbWUiOiJyW0ga3Jpc2huyYSIsInJvbGVyOiImFhMJiiwiYWNjZXNzQ29kZS6InhnQXNOQyIsImNsaWVudEljoiZDljYmI2OTktNmEyN0ONE1LThkNTktoGlXYmVmYTgxNmRhiIwiV2xpZW50U2VuY3JldjoidFZKWFhuKJTZvhJulhlTSJ9.YApD98gq0IN_0Ww7JMfmuUfK1m4hLTm7AlcLDcLAZvG'; 

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
    <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '1.25rem', color: '#333', marginBottom: '15px' }}>{label}</h3>
      <button
        onClick={() => fetchAndCalculate(type)}
        style={{
          padding: '12px 18px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Fetch & Calculate
      </button>

      {results[type].data.length > 0 && (
        <div style={{ marginTop: '15px', color: '#333' }}>
          <strong style={{ color: '#007bff' }}>Numbers:</strong> {results[type].data.join(', ')}
        </div>
      )}

      {results[type].average !== null && (
        <div style={{ marginTop: '10px', color: '#28a745' }}>
          <strong>Average:</strong> {results[type].average}
        </div>
      )}

      {results[type].error && (
        <div style={{ marginTop: '10px', color: '#dc3545' }}>
          <strong>Error:</strong> {results[type].error}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#333', marginBottom: '30px' }}>Average Calculator (Fibonacci, Even, Prime, Random)</h2>
      {renderSection('Fibonacci Numbers', 'fibo')}
      {renderSection('Even Numbers', 'even')}
      {renderSection('Prime Numbers', 'prime')}
      {renderSection('Random Numbers', 'rand')}
    </div>
  );
};

export default AverageCalculator;
