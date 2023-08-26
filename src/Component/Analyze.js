import ProgressBar from './CircularProgressBar'
import React, { useState } from 'react';
import Loader from '../images/loading.gif'
import notFound from '../images/404.png'

function Analyze() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const result = await callAPi();
      if (result.status === 'error') {
        throw new Error('Username Not Found')
      }
      setData(result);
      console.log(result)
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
    setData({});
    setError(false);
  };

  const callAPi = async () => {
    if (username === '' || data.status === 'error') {
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
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'An error occurred.');
    }

    return await response.json();
  };

  let message = ""

  if (data.easySolved > data.mediumSolved && data.easySolved > data.hardSolved) {
    message = `While ${username} has solved a significant number of easy problems, they may benefit from increasing their exposure to medium and hard problems. These difficulty levels offer more complex and challenging algorithmic scenarios, which can further enhance their problem-solving abilities.`
  }
  else if (data.mediumSolved > data.easySolved && data.mediumSolved > data.hardSolved) {
    message = `The higher number of solved medium problems (${data.mediumSolved}) indicates that ${username} is comfortable with problems of moderate complexity. Medium problems often require a good understanding of coding concepts and logic.`
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
      {loading && <p><img width='40px' height='40px' src={Loader} alt="loader" /></p>}

      {error && (
        <div>
          {/* <p>Error: {error}</p> */}
          <img src={notFound} alt="Not Found" />
        </div>
      )}
      {(!error && data.totalSolved && (
        <div>
          <div className='data-display'>
            <h3>Total Solved Problems: {data.totalSolved}</h3>
            <div className='problems'>
              <p>Easy Problems: {data.easySolved}</p>
              <p>Medium Problems: {data.mediumSolved}</p>
              <p>Hard Problems: {data.hardSolved}</p>
            </div>
            <ProgressBar className='progressBar' rateValue={data.acceptanceRate} />
            <p className='message'>Some Observations : <br /> {message}</p>
          </div>
        </div>
      ))}

    </div>
  );
}

export default Analyze;
