import { ReactNode, useEffect, useState } from "react";
import {decode} from 'html-entities';
import { Question } from "../../interfaces"
import QuestionCard from "../questionCard/questionCard";
import Results from "../results/results";
import Navbar from "../navbar/navbar";
import LoadingModal from "../loading-modal/loading-modal";
interface Props{
    questions: Question[] | null
    getQuestions:()=>void
    setStart:(boolean:boolean)=>void
    setLoadingMain:(boolean:boolean)=>void
}
export default function Game({questions, getQuestions, setStart, setLoadingMain}:Props){

  const[questionNumber, setQuestionNumber]=useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([])
  const [nextQuestion, setNextQuestion] = useState<boolean>(false)
  const [lastQuestion, setLastQUestion] = useState<boolean>(false)
  const [showQuestions, setShowQuestions] = useState<boolean>(true)
  const [showResults, setShowResults] = useState<boolean>(false) 
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    if(decodedQuestions && questionNumber === decodedQuestions.length-1){
      setLastQUestion(true)
    }
  },[questionNumber])


  function handleNextQuestion(){
    setLoading(true)
    setTimeout(()=>{
      if(questions && questionNumber < questions.length - 1){
        setQuestionNumber(prev => prev +1)
        setNextQuestion(false)
      }
      else if(lastQuestion){
        setShowQuestions(false)
        setShowResults(true)
      }
    }, 500)
    setTimeout(()=>setLoading(false), 950)
  }

  function reset(){
    getQuestions()
    setNextQuestion(false)
    setQuestionNumber(0)
    setCorrectAnswers([])
    setShowQuestions(true)
    setShowResults(false)
    setLastQUestion(false)
  }

  function goToMenu(){
    setLoadingMain(true)
    setTimeout(()=>{
      setQuestionNumber(0)
      setCorrectAnswers([])
      setShowQuestions(true)
      setShowResults(false)
      setLastQUestion(false)
      setStart(false)
    },500)
    setTimeout(()=>setLoadingMain(false),950)
  }

  function correctAnswer(boolean:boolean){
    setCorrectAnswers(prev =>{
      const arr = prev
      if(boolean===true){
        arr.push(true)
      }
      else if(boolean=== false){
        arr.push(false)
      }
      return arr
    })
  }

    const decodedQuestions = questions?.map(prevQuestion => {
        return {...prevQuestion, 
          question: decode(prevQuestion.question), 
          incorrect_answers: prevQuestion.incorrect_answers.map(ans => {
            return decode(ans)
          }),
          correct_answer: decode(prevQuestion.correct_answer)}
      })

      function getQuestionCards():ReactNode[] | void{
        if(decodedQuestions){
          const card = decodedQuestions.map((question, index) => {
            return (
              <QuestionCard key={index} category={question.category} question={question.question} correct_answer={question.correct_answer} incorrect_answers={question.incorrect_answers} setNextQuestion={setNextQuestion} correctAnswer={correctAnswer}/>
            ) 
          })
          return card
        }
        else return
      }

      function getResults():ReactNode|void{
        if(decodedQuestions){
          let results=[]
          for(let i = 0; i< correctAnswers.length; i++){
            results.push(
              <Results key={crypto.randomUUID()} question={decodedQuestions[i].question} answer={decodedQuestions[i].correct_answer} status={correctAnswers[i]}/>
            )
          }
          return results
        }
        else return 
      }

      const questionCards = getQuestionCards()
      const resultCards = getResults()

    return (
      <>
        <Navbar goToMenu={goToMenu}/>
        <section className="game-board">
          {loading ? <LoadingModal/> : null}
          {showQuestions && questionCards ? questionCards[questionNumber]:null}
          {showResults && resultCards ? resultCards:null}
          <div className="buttons">
            {nextQuestion && !showResults? <button className="next-question btn" onClick={()=>handleNextQuestion()}>{!lastQuestion? 'Next Question' : 'Show Results'}</button> : null}
            {showResults?<button className='btn start'onClick={()=> goToMenu()}>Go to menu</button>: null}
            {questionNumber === 0 && nextQuestion === false ? null :<button className="reset-btn btn" onClick={()=> reset()}>Reset</button>}
          </div>
        </section> 
      </>
    )
}