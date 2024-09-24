import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import './App.css';
import Display from './Components/Display';
import Details from './Components/Details';
import Upload from './Components/Upload';

function App() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-center mb-4">
        <nav className="flex overflow-x-auto items-center p-1 space-x-1 text-sm text-gray-600 bg-gray-200 rounded-xl">
          <button
            role="tab"
            type="button"
            className={`flex items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset ${
              activeTab === 'upload'
                ? 'text-blue-600 bg-white shadow'
                : 'hover:text-gray-800'
            }`}
            onClick={() => handleTabClick('upload')}
          >
            Upload Resume
          </button>
          <button
            role="tab"
            type="button"
            className={`flex items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:ring-inset ${
              activeTab === 'display'
                ? 'text-blue-600 bg-white shadow'
                : 'hover:text-gray-800'
            }`}
            onClick={() => handleTabClick('display')}
          >
            Display Details
          </button>
        </nav>
      </div>

      <div className="flex justify-center">
        <div className="w-full">
          {activeTab === 'upload' ? (
            <Upload
              loading={loading}
              details={details}
              setDetails={setDetails}
              setLoading={setLoading}
              pdfToText={pdfToText}
            />
          ) : (
            <Display details={details} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;