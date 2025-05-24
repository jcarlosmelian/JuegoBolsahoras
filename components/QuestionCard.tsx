
import React from 'react';
import { QuestionData, AnswerOption } from '../types';

interface QuestionCardProps {
  question: QuestionData;
  onAnswer: (answer: AnswerOption) => void;
  questionNumber: number;
  totalQuestions: number;
  isShowingFeedback: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer, questionNumber, totalQuestions, isShowingFeedback }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-500 ease-in-out">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">Pregunta {questionNumber} de {totalQuestions}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">{question.text}</h2>
      </div>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            disabled={isShowingFeedback}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out
                        font-medium text-gray-700 
                        bg-slate-50 hover:bg-slate-100 border-slate-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
