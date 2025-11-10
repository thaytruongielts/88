import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, ChevronRight, Award, Loader2 } from 'lucide-react';
import { Question, TabConfig } from '../types';
import { generateQuizQuestions } from '../services/geminiService';

interface QuizProps {
  tabConfig: TabConfig;
}

const Quiz: React.FC<QuizProps> = ({ tabConfig }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    setShowResults(false);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);

    try {
      const data = await generateQuizQuestions(tabConfig.promptTopic);
      setQuestions(data);
    } catch (err) {
      setError('Failed to load quiz. Please check your connection or API key.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch quiz when tab changes
  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabConfig.id]);

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerChecked) {
      setSelectedOption(optionId);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    setIsAnswerChecked(true);
    if (selectedOption === questions[currentIndex].correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className={`w-12 h-12 animate-spin text-${tabConfig.color.replace('bg-', '')}`} />
        <p className="text-gray-600 font-medium">Generating specific exercises for {tabConfig.unit}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-6">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={fetchQuiz}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedback = "";
    if (percentage >= 90) feedback = "Excellent! You've mastered this topic.";
    else if (percentage >= 70) feedback = "Great job! Keep practicing.";
    else feedback = "Good effort! Review the material and try again.";

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <Award className={`w-24 h-24 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 text-lg mb-8">{tabConfig.label}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500 uppercase font-bold">Score</p>
            <p className="text-3xl font-bold text-gray-800">{score} / {questions.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-gray-500 uppercase font-bold">Accuracy</p>
            <p className={`text-3xl font-bold ${percentage >= 70 ? 'text-green-600' : 'text-orange-500'}`}>
              {percentage}%
            </p>
          </div>
        </div>

        <p className="text-gray-700 italic mb-8">"{feedback}"</p>

        <button 
          onClick={fetchQuiz}
          className={`px-8 py-3 ${tabConfig.color} text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-all flex items-center gap-2 mx-auto`}
        >
          <RotateCcw className="w-5 h-5" /> Practice Again
        </button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{tabConfig.label}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${tabConfig.color} transition-all duration-500 ease-out`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
            {currentQ.text}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = option.id === currentQ.correctOptionId;
              const isWrongSelection = isSelected && !isCorrect;
              
              let buttonStyle = "border-gray-200 hover:bg-gray-50 hover:border-gray-300";
              let icon = null;

              if (isAnswerChecked) {
                if (isCorrect) {
                  buttonStyle = "bg-green-50 border-green-500 ring-1 ring-green-500";
                  icon = <CheckCircle className="w-5 h-5 text-green-600" />;
                } else if (isWrongSelection) {
                  buttonStyle = "bg-red-50 border-red-500 ring-1 ring-red-500";
                  icon = <XCircle className="w-5 h-5 text-red-600" />;
                } else {
                  buttonStyle = "border-gray-200 opacity-50";
                }
              } else if (isSelected) {
                buttonStyle = `border-${tabConfig.color.split('-')[1]}-500 bg-${tabConfig.color.split('-')[1]}-50 ring-1 ring-${tabConfig.color.split('-')[1]}-500`;
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isAnswerChecked}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${buttonStyle}`}
                >
                  <span className={`font-medium ${isAnswerChecked && isCorrect ? 'text-green-800' : 'text-gray-700'}`}>
                    {option.text}
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer / Explanation Area */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          {isAnswerChecked ? (
            <div className="animate-fade-in">
               <div className={`mb-4 p-4 rounded-lg text-sm ${selectedOption === currentQ.correctOptionId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p className="font-bold mb-1">
                    {selectedOption === currentQ.correctOptionId ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p>{currentQ.explanation}</p>
               </div>
               <button
                onClick={handleNextQuestion}
                className={`w-full py-3 rounded-lg font-bold text-white shadow-sm flex items-center justify-center gap-2 ${tabConfig.color} hover:opacity-90 transition-opacity`}
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className={`w-full py-3 rounded-lg font-bold text-white shadow-sm transition-all 
                ${selectedOption ? `${tabConfig.color} hover:opacity-90` : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
