import React from "react";
import Details from "./Details";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Upload({ loading, details, setDetails, setLoading, pdfToText }) {
  function extractText(event) {
    const file = event.target.files[0];
    setLoading(true);

    pdfToText(file)
      .then((text) => {
        console.log("Extracted text:", text);
        sendTextToServer(text);
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF", error);
        toast.error("Failed to extract text from PDF");
        setLoading(false);
      });
  }

  function sendTextToServer(paragraph) {
    fetch("https://hashagile-server.onrender.com/generateDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paragraph }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received response:", data);
        setDetails(data.details);
        postDetailsToServer(data.details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to send text to the server", error);
        toast.error("Failed to send text to the server");
        setLoading(false);
      });
  }

  function postDetailsToServer(details) {
    fetch("https://hashagile-server.onrender.com/postdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Details posted successfully:", data);
        toast.success("Details posted successfully!");
      })
      .catch((error) => {
        console.error("Failed to post details to the server", error);
        toast.error("Failed to post details to the server");
      });
  }

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border-dotted border-4 border-gray-300">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Upload your Resume
        </h1>

        <label className="flex cursor-pointer justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-sm transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
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
              <span className="text-blue-600 underline">Select a file</span>
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

      <Details loading={loading} details={details} />
      <ToastContainer />
    </div>
  );
}

export default Upload;
