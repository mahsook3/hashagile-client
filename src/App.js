import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import './App.css';
import Display from './Components/Display';
import Details from './Components/Details';

function App() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  function extractText(event) {
    const file = event.target.files[0];
    setLoading(true); // Show loading spinner while processing

    pdfToText(file)
      .then(text => {
        console.log("Extracted text:", text);
        sendTextToServer(text);
      })
      .catch(error => {
        console.error("Failed to extract text from PDF", error);
        setLoading(false); // Stop loading on error
      });
  }

  // Send extracted text to generateDetails endpoint
  function sendTextToServer(paragraph) {
    fetch('http://localhost:5000/generateDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paragraph }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received response:", data);
        setDetails(data.details); // Update the state with the received details

        // Send the extracted details to another endpoint (postdetails)
        postExtractedDetails(data.details);
        console.log('Details posted to server');

        setLoading(false); // Stop loading after receiving response
      })
      .catch(error => {
        console.error("Failed to send text to the server", error);
        setLoading(false); // Stop loading on error
      });
  }

  // Post extracted details to postdetails endpoint
  function postExtractedDetails(details) {
    fetch('http://localhost:5001/postdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ details }), // Send the extracted details in the specified format
    })
      .then(response => {
        if (response.ok) {
          console.log('Details posted successfully');
        } else {
          console.error('Failed to post details');
        }
      })
      .catch(error => {
        console.error('Error posting details:', error);
      });
  }

  return (
<>
<div className="flex justify-center">
  <nav className="flex overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
    <button
      role="tab"
      type="button"
      className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset text-yellow-600 shadow bg-white dark:text-white dark:bg-yellow-600"
      aria-selected=""
    >
      Upload Resume
    </button>
    <button
      role="tab"
      type="button"
      className="flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 focus:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400"
    >
      Upladed Resumes
    </button>
  </nav>
</div>

  <div className="flex min-h-screen">
    <div className="w-4/5">
    <Details loading={loading} details={details} />
    </div>
    <div className="w-1/5 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Upload your Resume
        </h1>

        <label
          className="flex cursor-pointer justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          <span className="flex items-center space-x-2">
            <svg className="h-6 w-6 text-gray-400" viewBox="0 0 256 256">
              <path
                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <path
                d="M80,128a80,80,0,1,1,144,48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <polyline
                points="118.1 161.9 152 128 185.9 161.9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
              <line
                x1={152}
                y1={208}
                x2={152}
                y2={128}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={24}
              />
            </svg>
            <span className="text-gray-600">
              Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
            </span>
          </span>
          <input
            id="photo-dropbox"
            type="file"
            accept="application/pdf"
            onChange={extractText}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  </div>
  <Display />

</>
  );
}

export default App;