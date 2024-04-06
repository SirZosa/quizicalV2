import { useEffect, useState } from "react";
import classNames from "classnames";
import Timer from "../timer/timer";

interface Props{
    category:string;
    question:string;
    correct_answer:string;
    incorrect_answers:string[];
    setNextQuestion: (boolean:boolean) => void;
    correctAnswer:(boolean:boolean) => void
}

interface Answer{
    answer:string;
    correct: boolean
}

export default function QuestionCard({category, question, correct_answer, incorrect_answers, setNextQuestion, correctAnswer}:Props){
    const [sortedAnswers, setSortedAswers] = useState<Answer[] |null>(null)
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number |null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState<number|null>(null)
    const [answer, setAnswer] = useState<boolean>(false)
    const [correct, setCorrect] = useState<boolean | null>(null)

    useEffect(()=>{
        const correctAns: Answer = { answer: correct_answer, correct: true };
        const incorrectAns: Answer[] = incorrect_answers.map((ans) => ({
          answer: ans,
          correct: false,
        }));
        const allAnswers:Answer[] = [correctAns, ...incorrectAns].sort(()=> Math.random()-0.5);
        setCorrectAnswerIndex(allAnswers.findIndex(ans => ans.correct === true))
        setSortedAswers(allAnswers)
      },[])

    useEffect(()=>{
        if(selectedAnswer !==null && selectedAnswer === correctAnswerIndex){
            setCorrect(true)
            correctAnswer(true)
        }
        if(selectedAnswer !==null && selectedAnswer !== correctAnswerIndex){
            setCorrect(false)
            correctAnswer(false)
        }
    },[selectedAnswer])

    function handleClick(index:number){
        if(!answer){
            setSelectedAnswer(index)
            setAnswer(true)
            setNextQuestion(true)
        }
        else return
    }

    function timeOut(){
        setAnswer(true)
        setNextQuestion(true)
        correctAnswer(false)
    }

    const AnsSorted = sortedAnswers?.map((ans, index) =>{
        let className:string
        if(index === selectedAnswer && index === correctAnswerIndex){
            className = classNames('answer', 'correct')
        }
        else if(index === selectedAnswer && index !== correctAnswerIndex){
            className = classNames('answer', 'incorrect')
        }
        else if(answer && index=== correctAnswerIndex){
            className = classNames('aswer', 'correct')
        }
        else{
            className = 'answer'
        }
        return(
            <p key={crypto.randomUUID()} className={className} onClick={()=>handleClick(index)}>{ans.answer}</p>
        )
    })
    return(
        <div className="question-card">
            <h3 className="category">{category}</h3>
            <h2 className="question">{question}</h2>
            <div className="answer-timer">
            <div className="answers">
                {sortedAnswers? AnsSorted : <h1>loading</h1>}
            </div>
        <Timer propFunction={timeOut} stop={answer} correct={correct}/>
        </div>
        </div>
    )
}