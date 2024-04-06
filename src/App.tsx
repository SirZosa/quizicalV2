import './App.css'
import {useState} from 'react'
import Menu from './components/menu/menu.tsx'
import Game from './components/game/game.tsx'
import { Question } from './interfaces.ts'


function App() {
  interface GameSettings {
    category: string;
    difficulty: string;
  }

  const [game, setGame] = useState<GameSettings>({category:'', difficulty:''})
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [start, setStart] = useState<boolean>(false)

  function getQuestions(){
    fetch(`https://opentdb.com/api.php?amount=5${game.category}${game.difficulty}`)
    .then(res => res.json())
    .then(data => setQuestions(data.results))
    setStart(true)
  }

  function getGame(valueToChange:string ,value: string):void{
    if(valueToChange==='category'){
      setGame({
        ...game,
        category:value})
      }
    else if(valueToChange==='difficulty'){
      setGame({
        ...game,
        difficulty:value})
      }
    }
    
  return (
    <>
      {start? <Game questions={questions} getQuestions={getQuestions} setStart={setStart}/> : <Menu getGame={getGame} getQuestions={getQuestions}/>}
    </>
  )
}

export default App
