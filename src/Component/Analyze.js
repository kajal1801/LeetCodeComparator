import React, { useState } from 'react';

function Analyze() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await callAPi();
      setData(result);
      console.log(result)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
    setData({});
    setError(null);
  };

  const callAPi = async () => {
    if (username === '') {
      throw new Error('Username Not Found');
    }

    const url = 'https://leetcode-stats-api.herokuapp.com/' + username;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    return await response.json();
  };

  let message = ""

  if (data.easySolved > data.mediumSolved && data.easySolved > data.hardSolved) {
    message = `While ${username} has solved a significant number of easy problems, they may benefit from increasing their exposure to medium and hard problems. These difficulty levels offer more complex and challenging algorithmic scenarios, which can further enhance their problem-solving abilities.`
  }
  else if (data.mediumSolved > data.easySolved && data.mediumSolved > data.hardSolved) {
    message = `The higher number of solved medium problems (${data.mediumSolved}) indicates that the person is comfortable with problems of moderate complexity. Medium problems often require a good understanding of coding concepts and logic.`
  }
  else {
    message = `The high number of solved hard problems (${data.hardSolved}) suggests that the person is comfortable tackling complex algorithmic challenges. Hard problems are typically more challenging and require deeper understanding and problem-solving skills.`
  }

  return (
    <div>
      <form>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div>
          <button className='btn' onClick={handleSubmit}>Submit</button>
          <button className='btn' type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.totalSolved && (
        <div className='data-display'>
          <h2>{username}</h2>
          <p>Total Solved Problems: {(data.totalSolved / data.totalQuestions * 100).toFixed(2)}</p>
          <p>Easy Problems: {data.easySolved}</p>
          <p>Medium Problems: {data.mediumSolved}</p>
          <p>Hard Problems: {data.hardSolved}</p>
          <p>Acceptance Rate: {data.acceptanceRate}%</p>
          <p>{message}</p>
          <div className='data-encloser'>
            <div className='skills'>
              <div className='outer'>
                <div className='inner'>
                  <div id='totalSolved'>{(data.totalSolved / data.totalQuestions * 100).toFixed(2)}%</div>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stop-color="#7f62c4" />
                    <stop offset="100%" stop-color="#6d2b8a" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="70" stroke-linecap="round" />
              </svg>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Analyze;
