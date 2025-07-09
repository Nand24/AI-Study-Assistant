import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowPdfHistory = ({ setShowHistory, pdfId }) => {
  const [pdfHistory, setPdfHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPdfHistory = async (pdfId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/pdfHistory/${pdfId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPdfHistory(response.data);
      } else {
        setPdfHistory(null);
      }
    } catch (err) {
      console.error("Error fetching PDF history:", err);
      setPdfHistory(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPdfHistory(pdfId);
  }, [pdfId]);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4 relative">
        <button
          onClick={() => setShowHistory(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold">PDF Attempt History</h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : pdfHistory ? (
          <>
            <p><strong>Title:</strong> {pdfHistory.pdfTitle}</p>
            <p><strong>Total Attempted:</strong> {pdfHistory.totalQuestionsAttempted || 0}</p>
            <p><strong>Correct:</strong> {pdfHistory.correctAnswers}</p>
            <p><strong>Wrong:</strong> {pdfHistory.wrongAnswers}</p>
            <p><strong>Score:</strong> {pdfHistory.score}%</p>
            <p><strong>Date:</strong> {new Date(pdfHistory.submittedAt || pdfHistory.date).toLocaleString()}</p>
          </>
        ) : (
          <p className="text-center text-gray-500">No history found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowPdfHistory;
