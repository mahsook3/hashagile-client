// Details.js
import React from 'react';


const Details = ({ loading, details }) => {
  return (
    <>
      {loading && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {details && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Extracted Details:</h3>
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-600">Name</td>
                <td className="px-4 py-2">{details.name}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-600">Email</td>
                <td className="px-4 py-2">{details.email}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-600">Phone</td>
                <td className="px-4 py-2">{details.phone}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-600">College</td>
                <td className="px-4 py-2">{details.college_name}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-lg font-medium text-gray-800 mt-6">Skills:</h4>
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <tbody>
              {details.skills.map((skill, index) => (
                <tr className="border-b" key={index}>
                  <td className="px-4 py-2 text-gray-600">{skill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Details;