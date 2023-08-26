import React, { useState } from 'react';
import ProgressBar from './CircularProgressBar'
import Loader from '../images/loading.gif'
import notFound from '../images/404.png'

function Compare() {
    const [username1, setUsername1] = useState('');
    const [username2, setUsername2] = useState('');
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);

    const handleSubmit = (e) => {
        handleSubmit1(e)
        handleSubmit2(e)
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setError1(null);
        setLoading1(true);

        try {
            const result = await callAPi(username1);
            if(result.status === 'error'){
                throw new Error('Username Not Found')
            }
            setData1(result);
        } catch (err) {
            setError1(err.message);
        } finally {
            setLoading1(false);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        setError2(null);
        setLoading2(true);

        try {
            const result = await callAPi(username2);
            console.log(result)
            if(result.status === 'error'){
                throw new Error('Username Not Found')
            }
            setData2(result);
        } catch (err) {
            setError2(err.message);
        } finally {
            setLoading2(false);
        }
    };

    const handleClear = () => {
        setUsername1('');
        setData1({});
        setError1(null);

        setUsername2('');
        setData2({});
        setError2(null);
    };

    const callAPi = async (username) => {
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
            throw new Error(`Username Not Found`);
        }

        return await response.json();
    };

    return (
        <div>
            <div className='compare-div'>
                <div className='forms'>
                    <form>
                        <input
                            type="text"
                            id="username1"
                            placeholder="Enter your username"
                            value={username1}
                            onChange={(e) => setUsername1(e.target.value)}
                        />
                    </form>

                </div>

                <div className='forms'>
                    <form>
                        <input
                            type="text"
                            id="username2"
                            placeholder="Enter username of another user"
                            value={username2}
                            onChange={(e) => setUsername2(e.target.value)}
                        />
                    </form>

                </div>
            </div>
            <div>
                <button className='btn' onClick={handleSubmit}>Submit</button>
                <button className='btn' type="button" onClick={() => handleClear()}>Clear</button>
            </div>
            <div class='compare-data'>
                <div>
                    {loading1 && <p><img width='40px' height='40px' src={Loader} alt="loader" /></p>}
                    {error1 && (
                        <div>
                            {/* <p>Error: {error}</p> */}
                            <img src={notFound} alt="Not Found" />
                        </div>
                    )}
                    {data1.totalSolved && (
                        <div className='data-display'>
                            <h2>{username1}</h2>
                            <h3>Total Solved Problems: {data1.totalSolved}</h3>
                            <div className='compare-problems'>
                                <p>Easy Problems: {data1.easySolved}</p>
                                <p>Medium Problems: {data1.mediumSolved}</p>
                                <p>Hard Problems: {data1.hardSolved}</p>
                            </div>
                            <ProgressBar className='progressBar' rateValue={data1.acceptanceRate} />
                        </div>
                    )}
                </div>
                <div>
                    {loading2 && <p><img width='40px' height='40px' src={Loader} alt="loader" /></p>}
                    {error2 && (
                        <div>
                            {/* <p>Error: {error}</p> */}
                            <img src={notFound} alt="Not Found" />
                        </div>
                    )}
                    {data2.totalSolved && (
                        <div className='data-display'>
                            <h2>{username2}</h2>
                            <h3>Total Solved Problems: {data2.totalSolved}</h3>
                            <div className='compare-problems'>
                                <p>Easy Problems: {data2.easySolved}</p>
                                <p>Medium Problems: {data2.mediumSolved}</p>
                                <p>Hard Problems: {data2.hardSolved}</p>
                            </div>
                            <ProgressBar className='progressBar' rateValue={data2.acceptanceRate} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Compare;
