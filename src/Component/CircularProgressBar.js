import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function CircularProgressBar({ rateValue }) {
  // Calculate the normalized rate for the progress bar (0-100)
  const normalizedRate = Math.min(100, Math.max(0, rateValue));

  return (
    <div style={{ width: '170px', margin: 'auto' }}>
      <CircularProgressbar
        value={rateValue} // Use the rateValue directly here
        text={`${normalizedRate}%`} // Use normalizedRate for the text
        styles={buildStyles({
          textSize: '16px',
          pathTransitionDuration: 2.5, // Animation duration
          pathColor: `rgb(109,43,138)`, // Dynamic path color based on completion rate
          textColor: '#6d2b8a', // Text color
          trailColor: '#d6d6d6', // Trail color (background color of the circle)
          backgroundColor: '#3e98c7', // Background color of the circle
        })}
      />
    </div>
  );
}

export default CircularProgressBar;
