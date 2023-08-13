import React, { useState } from 'react';

function Compare() {
    const [username1, setUsername1] = useState('');
    const [username2, setUsername2] = useState('');
    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setError1(null);
        setLoading1(true);

        try {
            const result = await callAPi(username1);
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
            setData2(result);
        } catch (err) {
            setError2(err.message);
        } finally {
            setLoading2(false);
        }
    };

    const handleClear = (username) => {
        if (username === username1) {
            setUsername1('');
            setData1({});
            setError1(null);
        }
        else {
            setUsername2('');
            setData2({});
            setError2(null);
        }
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
            throw new Error(`Error! status: ${response.status}`);
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
                        <div>
                            <button className='btn' onClick={handleSubmit1}>Submit</button>
                            <button className='btn' type="button" onClick={() => handleClear(username1)}>Clear</button>
                        </div>
                    </form>
                    {loading1 && <p>Loading...</p>}
                    {error1 && <p>Error: {error1}</p>}
                    {data1.totalSolved && (
                        <div>
                            <h2>{username1}</h2>
                            <p>Total Solved: {data1.totalSolved}</p>
                        </div>
                    )}
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
                        <div>
                            <button className='btn' onClick={handleSubmit2}>Submit</button>
                            <button className='btn' type="button" onClick={() => handleClear(username2)}>Clear</button>
                        </div>
                    </form>
                    {loading2 && <p>Loading...</p>}
                    {error2 && <p>Error: {error2}</p>}
                    {data2.totalSolved && (
                        <div>
                            <h2>{username2}</h2>
                            <p>Total Solved: {data2.totalSolved}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Compare;
