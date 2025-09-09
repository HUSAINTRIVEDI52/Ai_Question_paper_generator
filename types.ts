export interface Config {
  institutionName: string;
  totalMarks: string;
  examDate: string;
  standard: string;
  subject: string;
  medium: string;
  chapter: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface QuestionCounts {
  mcqs: number;
  shortAnswer: number;
  longAnswer: number;
  fillInTheBlanks: number;
  trueFalse: number;
}

export interface MCQ {
  question: string;
  options: string[];
  answer: string;
}

export interface TextQuestion {
  question: string;
  answer: string;
}

export interface TrueFalseQuestion {
    question: string;
    answer: boolean;
}

export interface Paper {
  mcqs?: MCQ[];
  shortAnswer?: TextQuestion[];
  longAnswer?: TextQuestion[];
  fillInTheBlanks?: TextQuestion[];
  trueFalse?: TrueFalseQuestion[];
}