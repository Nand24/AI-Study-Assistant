import React, { useState, useEffect, useContext } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ShowPdfHistory from './ShowPdfHistory';
import { studyDataContext } from '../context/StudyContext';
import axios from 'axios';

const sampleData = {
  summary: [
    "**Drug Addiction:** A chronic disease fueled by peer pressure, stress, and curiosity, with devastating health, social, and economic consequences. Combating it requires societal awareness, education, government intervention (de-addiction centers, stricter laws), and public health initiatives.",
    "**Media's Role:** A powerful tool with the potential to inform, educate, and connect people positively, but also to spread misinformation and bias. Responsible media usage and regulation, especially concerning social media, are crucial.",
    "**COVID-19 & Post-COVID World:** The pandemic caused widespread health, economic, and lifestyle disruptions. While it spurred digitalization and increased hygiene awareness, challenges remain in economic recovery, mental health, and equitable vaccine distribution.",
  ],

  qna: [
    {
      question: "What are the major causes of drug addiction among youth?",
      answer: "Peer pressure, stress, and curiosity are major factors contributing to drug addiction in young people."
    },
    {
      question: "What is the negative role of media in society?",
      answer: "Media can sometimes spread fake news, sensationalism, and political bias."
    },
    {
      question: "What positive changes resulted from the COVID-19 pandemic?",
      answer: "The pandemic led to a boost in digitalization, increased hygiene awareness, and the growth of remote work culture."
    },
    {
      question: "What are some solutions to the problem of growing pollution?",
      answer: "Solutions include transitioning to green energy, utilizing public transport, improving waste management, and engaging in afforestation."
    },
    {
      question: "How does discipline contribute to success?",
      answer: "Disciplined individuals are more likely to achieve success and earn respect due to their self-control, punctuality, and respect for others."
    }
  ],

  quiz: [
    {
      question: "What is a significant social impact of drug addiction, as described in the text?",
      options: [
        "Increased tourism",
        "Broken families",
        "Improved healthcare",
        "Economic prosperity"
      ],
      correctAnswer: "B"
    },
    {
      question: "According to the text, what is a negative role that media sometimes plays?",
      options: [
        "Promoting literacy",
        "Spreading awareness of social issues",
        "Spreading fake news",
        "Connecting people globally"
      ],
      correctAnswer: "C"
    },
    {
      question: "Which of the following is NOT listed as a positive change resulting from the COVID-19 pandemic?",
      options: [
        "Boost to digitalization",
        "Increased international travel",
        "Hygiene awareness",
        "Remote work culture"
      ],
      correctAnswer: "B"
    },
    {
      question: "What is one solution to the problem of growing pollution mentioned in the text?",
      options: [
        "Increased industrial production",
        "Using more private vehicles",
        "Green energy",
        "Deforestation"
      ],
      correctAnswer: "C"
    },
    {
      question: "According to the text, what is a consequence of unemployment?",
      options: [
        "Increased economic growth",
        "Reduced poverty",
        "Poverty",
        "Improved social stability"
      ],
      correctAnswer: "C"
    }
  ],

  trueFalse: [
    {
      question: "Drug addiction is solely caused by peer pressure.",
      answer: "False"
    },
    {
      question: "Media always plays a positive role in society.",
      answer: "False"
    },
    {
      question: "Covid-19 had no positive impacts.",
      answer: "False"
    },
    {
      question: "Pollution only affects the environment, not human health.",
      answer: "False"
    },
    {
      question: "Discipline is only important in formal settings like school and the workplace.",
      answer: "False"
    }
  ]
}

const userAnswers = {
  quiz: [
    {
      question: "What is a significant social impact of drug addiction?",
      options: ["Increased tourism", "Broken families", "Improved healthcare", "Economic prosperity"],
      correctAnswer: "B",
      userAnswer: "B"
    },
    {
      question: "According to the text, what is a negative role that media sometimes plays?",
      options: [
        "Promoting literacy",
        "Spreading awareness of social issues",
        "Spreading fake news",
        "Connecting people globally"
      ],
      correctAnswer: "C",
      userAnswer: "B"
    },
    {
      question: "Which of the following is NOT listed as a positive change resulting from the COVID-19 pandemic?",
      options: [
        "Boost to digitalization",
        "Increased international travel",
        "Hygiene awareness",
        "Remote work culture"
      ],
      correctAnswer: "B",
      userAnswer: "B"
    },
    {
      question: "What is one solution to the problem of growing pollution mentioned in the text?",
      options: [
        "Increased industrial production",
        "Using more private vehicles",
        "Green energy",
        "Deforestation"
      ],
      correctAnswer: "C",
      userAnswer: "C"
    },
    {
      question: "According to the text, what is a consequence of unemployment?",
      options: [
        "Increased economic growth",
        "Reduced poverty",
        "Poverty",
        "Improved social stability"
      ],
      correctAnswer: "C",
      userAnswer: "B"
    }
  ],
  trueFalse: [
    {
      question: "Drug addiction is solely caused by peer pressure.",
      answer: "False",
      userAnswer: "False"
    },
    {
      question: "Media always plays a positive role in society.",
      answer: "False",
      userAnswer: "False"
    },
    {
      question: "Covid-19 had no positive impacts.",
      answer: "False",
      userAnswer: "True"
    },
    {
      question: "Pollution only affects the environment, not human health.",
      answer: "False",
      userAnswer: "False"
    },
    {
      question: "Discipline is only important in formal settings like school and the workplace.",
      answer: "False",
      userAnswer: "True"
    }
  ]
};

const PdfStudyDataContainer = ({pdfId , load}) => {

  const {studyData,setStudyData} = useContext(studyDataContext);

  const [loading, setLoading] = useState(false);

  const [hasAttempted, setHasAttempted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [attemptStudyData , setAttemptStudyData] = useState(null);

  const [quizAnswers, setQuizAnswers] = useState({});
  const [trueFalseAnswers, setTrueFalseAnswers] = useState({});

  const handleQuizChange = (questionIndex, value) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleTFChange = (questionIndex, value) => {
    setTrueFalseAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

    // Prepare `quizzAnswer` array
    const quizzAnswer = studyData.quiz.map((q, i) => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      userAnswer: quizAnswers[i] || ""
    }));

    // Prepare `trueFalseAnswer` array
    const trueFalseAnswer = studyData.trueFalse.map((q, i) => ({
      question: q.question,
      answer: q.answer,
      userAnswer: trueFalseAnswers[i] === "True" // convert to Boolean
    }));

    try {
      console.log('ok')
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/updateuserAnswer`, {
        pdfId,
        quizzAnswer,
        trueFalseAnswer
      },
      {
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }
    );

    console.log(quizzAnswer , trueFalseAnswer)

      if(res.status === 200){
        console.log('attempt ok');
        console.log(res.data);
        setAttemptStudyData(res.data.userAnswers);
        attemptPdf(pdfId);
      }
      
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Failed to submit answers.");
    }
    finally {
    setLoading(false);
  }
  };

  const handleTryAgain = () => {
    setHasAttempted(false);
  };

  const attemptPdf = async (pdfId) => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      try{

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getUserAnswer/${pdfId}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        
        if (response.data.value === true) {
          setAttemptStudyData(response.data.userAnswers);
          console.log(response.data)
          setHasAttempted(true);
          return
        } else {
          setAttemptStudyData(response.data.message);
          setHasAttempted(false);
          return
        }
      }catch(err){
        console.log(err)
      }
  }

  useEffect(()=>{
    attemptPdf(pdfId);
  },[pdfId])

  return (
    <div className="h-[98vh] w-full overflow-y-auto p-4 space-y-6">
      {
        showHistory&&(<ShowPdfHistory pdfId={pdfId} setShowHistory={setShowHistory} />)
      }
    {
      load ? 
       <div>
       <div className='w-full flex justify-end'>
        <button onClick={()=>{setShowHistory(true)}} className="text-blue-600 hover:text-blue-700 cursor-pointer">
          Pdf details
        </button>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Summary</h2>
        {studyData?.summary?.map((item, i) => (
          <p key={i} className="text-sm text-gray-700">{item}</p>
        ))}
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Q&A</h2>
        {studyData?.qna?.map((item, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded-md">
            <p className="font-semibold">Q: {item.question}</p>
            <p className="text-sm text-gray-700">A: {item.answer}</p>
          </div>
        ))}
      </div>

      {hasAttempted ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Quiz Attempt</h2>
            {attemptStudyData?.quizzAnswer?.map((q, i) => (
              <div key={i} className="p-3 bg-white shadow rounded">
                <p className="font-semibold">{q.question}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                {q.options.map((option, idx) => {
  const optionLetter = String.fromCharCode(65 + idx); // "A", "B", "C", ...
  const isUserAnswer = option === q.userAnswer;
  const isCorrectAnswer = optionLetter === q.correctAnswer;
  const userChoseWrong = isUserAnswer && !isCorrectAnswer;
  const userChoseRight = isUserAnswer && isCorrectAnswer;
  const isCorrectButNotChosen = !isUserAnswer && isCorrectAnswer;

  let borderColor = 'bg-gray-100';
  if (userChoseRight) borderColor = 'bg-green-100 border-green-500';
  else if (userChoseWrong) borderColor = 'bg-red-100 border-red-500';
  else if (isCorrectButNotChosen) borderColor = 'bg-green-50 border-green-400';
  else borderColor = 'bg-gray-100 border-gray-300';

  return (
    <div
      key={idx}
      className={`flex items-center justify-between space-x-2 p-2 rounded border ${borderColor}`}
    >
      <span>{option}</span>

      {/* Icons */}
      {userChoseRight && <FaCheckCircle className="text-green-600" />}
      {userChoseWrong && <FaTimesCircle className="text-red-600" />}
      {isCorrectButNotChosen && (
        <span className="text-sm text-green-600 italic">(Correct)</span>
      )}
    </div>
  );
})}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your True/False Attempt</h2>
            {attemptStudyData?.trueFalseAnswer?.map((q, i) => {
              const isCorrect = q.userAnswer === q.answer;
              return (
                <div key={i} className={`p-3 bg-white shadow rounded border ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <p className="font-semibold">{q.question}</p>
                  <div className="mt-2 flex items-center space-x-5">
                    <span>Your Answer: {q.userAnswer ? "True" : "False"}</span>
                    {isCorrect ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaTimesCircle className="text-red-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleTryAgain}
            className="mt-4 bg-blue-600 cursor-pointer text-white px-4 py-2 rounded shadow"
          >
            Try Again
          </button>
        </div>
      ) : (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Quiz</h2>
        {studyData?.quiz?.map((q, i) => (
          <div key={i} className="p-3 bg-white shadow rounded">
            <p className="font-semibold">{q.question}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {q.options.map((option, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`quiz-${i}`}
                    value={option}
                    onChange={() => handleQuizChange(i, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">True/False</h2>
        {studyData?.trueFalse?.map((q, i) => (
          <div key={i} className="p-3 bg-white shadow rounded">
            <p className="font-semibold">{q.question}</p>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`tf-${i}`}
                  value="True"
                  onChange={() => handleTFChange(i, "True")}
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`tf-${i}`}
                  value="False"
                  onChange={() => handleTFChange(i, "False")}
                />
                <span>False</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <button
  type="submit"
  disabled={loading}
  className={`bg-blue-600 text-white px-4 py-2 rounded shadow flex items-center justify-center space-x-2 ${
    loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
  }`}
>
  {loading && (
    <svg
      className="w-5 h-5 animate-spin text-white"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  )}
  <span>{loading ? 'Submitting...' : 'Submit Answers'}</span>
</button>
    </form>
      )}
     </div> : 
          <div className="w-full h-full flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
    }
    </div>
  );
};

export default PdfStudyDataContainer;