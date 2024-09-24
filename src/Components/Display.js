import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';

const Display = () => {
  const [details, setDetails] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/getdetails')
      .then(response => response.json())
      .then(data => setDetails(data.details))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const downloadPDF = (detail) => {
    const doc = new jsPDF();
    doc.text(`Name: ${detail.name}`, 10, 10);
    doc.text(`Email: ${detail.email}`, 10, 20);
    doc.text(`Phone: ${detail.phone}`, 10, 30);
    doc.text(`College: ${detail.college_name}`, 10, 40);
    doc.text(`Skills: ${detail.skills.join(', ')}`, 10, 50);
    doc.save(`${detail.name}_details.pdf`);
  };

  const downloadCSV = (detail) => {
    const csvContent = `data:text/csv;charset=utf-8,Name,Email,Phone,College,Skills\n${detail.name},${detail.email},${detail.phone},${detail.college_name},${detail.skills.join(' | ')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${detail.name}_details.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Email
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Phone
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              College
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Skills
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {details.length > 0 ? (
            details.map(detail => (
              <tr key={detail._id}>
                <td className="py-4 px-6 border-b border-gray-200">{detail.name}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{detail.email}</td>
                <td className="py-4 px-6 border-b border-gray-200">{detail.phone}</td>
                <td className="py-4 px-6 border-b border-gray-200">{detail.college_name}</td>
                <td className="py-4 px-6 border-b border-gray-200">{detail.skills.join(', ')}</td>
                <td className="py-4 px-6 border-b border-gray-200 relative">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-full text-xs"
                    onClick={() => toggleDropdown(detail._id)}
                  >
                    Download
                  </button>
                  {dropdownOpen === detail._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => downloadPDF(detail)}
                      >
                        Download PDF
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => downloadCSV(detail)}
                      >
                        Download CSV
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 px-6 border-b border-gray-200 text-center">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Display;