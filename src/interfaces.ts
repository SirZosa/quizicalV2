export interface Question{
      category: string;
      correct_answer: string;
      difficulty: string;
      incorrect_answers: [string, string, string];
      question: string;
      type: string
}