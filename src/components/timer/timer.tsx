import { CountdownCircleTimer } from 'react-countdown-circle-timer'
interface Props{
    propFunction:()=>void;
    stop:boolean
    correct:boolean|null
}

export default function Timer({propFunction, stop, correct}:Props){


    function color(){
        if(correct === true) return '#80ff00'
        if(correct === false) return '#ff0000'
        else return '#457EAC'
    }

    const renderTime = ({ remainingTime }:{remainingTime:number}) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
        if(correct === true){
            return (
                <div className="timer">
                    <div className="value timer-correct">correct!</div>
                </div>
            )
        }

        if(correct === false){
            return (
                <div className="timer">
                    <div className="value timer-wrong">wrong!</div>
                </div>
            )
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      }
    return(
        <CountdownCircleTimer
            isPlaying={!stop}
            duration={10}
            colors={color()}
            onComplete={() => {
            propFunction()
            return { shouldRepeat: false }
    }}>
        {renderTime}
    </CountdownCircleTimer>
    )
}