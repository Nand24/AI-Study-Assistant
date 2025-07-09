import React, { useEffect, useState } from 'react'
import  { useLayoutEffect, useRef } from 'react'
import { FaArrowRight, FaBrain, FaFileAlt, FaQuestion, FaCheckDouble } from 'react-icons/fa'
import gsap from 'gsap'
import Logo from '../components/Logo'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  const navbarRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const btnRef = useRef(null)

  const [signUpPannel , setSignUpPannel] = useState(true);
  const [signInPannel , setSignInPannel] = useState(true);

  // 🌀 Animation
 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline()

    tl.from(navbarRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    })

    tl.from([headingRef.current, subRef.current], {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    })

    tl.from(btnRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    })
  })

  return () => ctx.revert()
}, [])


  return (
      <>
          {signInPannel ? '' : <Signin setSignInPannel={setSignInPannel}/>}
          {signUpPannel ? " " : <Signup setSignUpPannel={setSignUpPannel} />}
     <div className="bg-white text-black w-full">
      {/* Navbar */}
      <nav
        ref={navbarRef}
        className="w-full py-4 px-6 md:px-10 flex justify-between items-center shadow-md sticky top-0 bg-white z-50"
      >
        <Logo />
        <ul className="hidden md:flex gap-8 text-md ">
          <li className="hover:text-blue-500 cursor-pointer">How it Works</li>
          <li className="hover:text-blue-500 cursor-pointer">About</li>
        </ul>
        <div className="flex gap-4 items-center text-md">
          <button onClick={()=>{setSignUpPannel(false) ,setSignInPannel(true)}} className="hover:text-blue-500 cursor-pointer bg-black text-white rounded-3xl px-3 py-1">
            Signup
          </button>
          <button onClick={()=>{setSignInPannel(false) , setSignUpPannel(true)}} className="hover:text-blue-500 cursor-pointer bg-black text-white rounded-3xl px-3 py-1">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <h1
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight"
        >
          Summarize, Quiz & Learn from your <span className="text-blue-600">PDFs</span> with AI
        </h1>
        <p
          ref={subRef}
          className="mt-6 text-lg max-w-2xl text-gray-600"
        >
          Upload your documents and let AI generate summaries, Q&A, True/False, and quizzes to boost your learning in less time.
        </p>
        <button
  ref={btnRef}
  onClick={()=>{
    navigate('/chat-pdf')
  }}
  className="mt-10 cursor-pointer bg-blue-600 text-white px-6 py-2 text-md rounded-full flex items-center gap-2 hover:bg-blue-700"
>
  Upload PDF <FaArrowRight />
</button>

      </section>

      {/* How it Works */}
      <section id="how-it-works" className="w-full min-h-screen py-24 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How it Works</h2>
        <div className="grid md:grid-cols-4 gap-10">
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <FaFileAlt className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload PDF</h3>
            <p className="text-gray-600">Choose any study material or document you want to learn from.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <FaBrain className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
            <p className="text-gray-600">Get a smart summary with key concepts and important highlights.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <FaQuestion className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Q&A + Quiz</h3>
            <p className="text-gray-600">Auto-generated questions with MCQs to test your knowledge.</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <FaCheckDouble className="text-3xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">True / False</h3>
            <p className="text-gray-600">Instant True/False type questions for concept clarity.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full min-h-screen py-24 px-6 md:px-20 bg-white">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">About This Project</h2>
        <div className="max-w-5xl mx-auto text-center text-md md:text-xl leading-relaxed text-gray-700 space-y-6">
          <p>
            Our AI-powered learning tool is designed for students, researchers, and lifelong learners who want to quickly understand complex documents without spending hours reading.
          </p>
          <p>
            Just upload any PDF — whether it's lecture notes, academic papers, or textbooks — and our system will instantly break it down into summarized sections, question-answers, quizzes, and even true/false based content for instant review.
          </p>
          <p>
            This not only helps in fast revision before exams but also improves retention through interactive learning. It's perfect for visual and active learners who prefer structured and smart studying.
          </p>
          <p>
            Our mission is to empower learners to absorb knowledge quickly, remember longer, and perform better.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-800 text-white py-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p>&copy; {new Date().getFullYear()} PDF Learning AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#how-it-works" className="hover:underline">How it Works</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
      </>
  )
}

export default Home
