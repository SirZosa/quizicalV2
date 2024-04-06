import { ReactNode } from "react";
interface Props{
    children:ReactNode | string
}
export default function QuestionCard({children}:Props){
    return(
        <div className="question-card">
            {children}
        </div>
    )
}