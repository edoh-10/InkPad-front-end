// src/components/AnimatedInkPadLogo.jsx
import React from 'react';

const AnimatedInkPadLogo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <svg width="200" height="80" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            .inkpad-letter {
              font-family: 'Arial', sans-serif;
              font-size: 40px;
              font-weight: bold;
              fill: #4F46E5; /* Indigo color */
              opacity: 0;
              animation: fadeInLetter 0.5s forwards;
            }
            @keyframes fadeInLetter {
              to {
                opacity: 1;
              }
            }
            .inkpad-letter.I { animation-delay: 0.1s; }
            .inkpad-letter.n { animation-delay: 0.2s; }
            .inkpad-letter.k { animation-delay: 0.3s; }
            .inkpad-letter.P { animation-delay: 0.5s; }
            .inkpad-letter.a { animation-delay: 0.6s; }
            .inkpad-letter.d { animation-delay: 0.7s; }

            .loading-dots span {
              animation: blink 1.4s infinite both;
              font-size: 24px;
              color: #6B7280; /* Gray color */
            }
            .loading-dots span:nth-child(1) { animation-delay: 0s; }
            .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
            .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes blink {
              0%, 80%, 100% { opacity: 0; }
              40% { opacity: 1; }
            }
          `}
        </style>
        <text x="10" y="50">
          <tspan className="inkpad-letter I">I</tspan>
          <tspan className="inkpad-letter n" dx="0">n</tspan>
          <tspan className="inkpad-letter k" dx="0">k</tspan>
          <tspan className="inkpad-letter P" dx="10">P</tspan>
          <tspan className="inkpad-letter a" dx="0">a</tspan>
          <tspan className="inkpad-letter d" dx="0">d</tspan>
        </text>
      </svg>
      <div className="loading-dots" style={{ marginTop: '10px' }}>
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
};

export default AnimatedInkPadLogo; 