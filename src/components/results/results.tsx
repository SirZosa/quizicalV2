interface Props{
    question:string;
    answer:string;
    status:boolean;
}

export default function Results({question, answer, status}:Props){
    const classes = `${status === true ? 'correct-answer': 'incorrect-answer'}`
    return(
        <section className="results">
            <h2 className="result-question">{question}</h2>
            <p className="result-status">You answered <span className={classes}>{status === true ? 'Correct' : 'Incorrect'}</span></p>
            <p className="result-answer">Correct answer: {answer}</p>
        </section>
    )
}