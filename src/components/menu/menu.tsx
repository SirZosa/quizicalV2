interface Props{
    getGame:(valueToChange:string, value:string)=>void;
    getQuestions:()=>void;
}

export default function Menu({getQuestions, getGame = () => {}}:Props){
    return(
        <section className="menu">
            <div className="menu-top">
                <h1 className="menu-title">Quizical V2</h1>
                <h2 className="menu-description">Prove your knowledge</h2>
            </div>
            <div className="menu-selection">
                <div className="category-select">
                    <label htmlFor="category">Select category:</label>
                    <select name="category" id="category" onChange={(e) => getGame('category', e.target.value)}>
                        <option value="">Any</option>
                        <option value="&category=9">General knowledge</option>
                        <option value="&category=10">Books</option>
                        <option value="&category=11">Film</option>
                        <option value="&category=12">Music</option>
                        <option value="&category=13">Musical & theatres</option>
                        <option value="&category=14">Television</option>
                        <option value="&category=15">Video games</option>
                        <option value="&category=16">Board games</option>
                        <option value="&category=17">Science & nature</option>
                        <option value="&category=18">Sciece: Computers</option>
                        <option value="&category=19">Sciece: Mathematics</option>
                        <option value="&category=20">Mythology</option>
                        <option value="&category=21">Sports</option>
                        <option value="&category=22">Geography</option>
                        <option value="&category=23">History</option>
                        <option value="&category=24">Politics</option>
                        <option value="&category=25">Art</option>
                        <option value="&category=26">Celebrities</option>
                        <option value="&category=27">Animals</option>
                        <option value="&category=28">Vehicles</option>
                        <option value="&category=29">Comics</option>
                        <option value="&category=30">Science: Gadgets</option>
                        <option value="&category=31">Japanase anime & manga</option>
                        <option value="&category=32">Cartoon & Animations</option>
                    </select>
                </div>
                <div className="difficulty-select">
                    <label htmlFor="difficulty">Select dificulty:</label>
                        <select name="difficulty" id="difficulty" onChange={(e) => getGame('difficulty', e.target.value)}>
                            <option value="">Any</option>
                            <option value="&difficulty=easy">Easy</option>
                            <option value="&difficulty=medium">Medium</option>
                            <option value="&difficulty=hard">Hard</option>
                        </select>
                </div>
            </div>
            <button onClick={() => getQuestions()} className="start btn">Start quiz</button>
        </section>
    )
}

