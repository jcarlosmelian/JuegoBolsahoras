
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, QuestionData, AnswerOption, GeneratedImages } from './types';
import { QUESTIONS, GAME_TITLE, IMAGE_PROMPTS, IMAGE_PROMPT_KEYS } from './constants';
import { generateImage } from './services/geminiService';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.LOADING_ASSETS);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerOption | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [images, setImages] = useState<GeneratedImages>({});

  const loadInitialImages = useCallback(async () => {
    setGameState(GameState.LOADING_ASSETS);
    const loadedImages: GeneratedImages = {};
    for (const imgPrompt of IMAGE_PROMPTS) {
      // For faster loading in dev if API is slow/costly, you can use placeholders
      // by checking an env var or similar, or just let it run.
      // const imageBase64 = MOCK_IMAGES[imgPrompt.key] || await generateImage(imgPrompt.prompt);
      const imageBase64 = await generateImage(imgPrompt.prompt);
      loadedImages[imgPrompt.key] = imageBase64;
    }
    setImages(loadedImages);
    // Shuffle questions for replayability, or keep them in order
    // setQuestions([...QUESTIONS].sort(() => Math.random() - 0.5));
    setQuestions(QUESTIONS); 
    setGameState(GameState.WELCOME);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadInitialImages();
  }, [loadInitialImages]);

  const startGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedbackMessage('');
    setGameState(GameState.PLAYING);
  };

  const handleAnswer = (answer: AnswerOption) => {
    setSelectedAnswer(answer);
    setGameState(GameState.SHOW_FEEDBACK);
    if (answer.isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedbackMessage('¡Correcto! ' + questions[currentQuestionIndex].explanation);
    } else {
      setFeedbackMessage('Incorrecto. ' + questions[currentQuestionIndex].explanation);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setFeedbackMessage('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.FINISHED);
    }
  };
  
  const getFeedbackCardStyle = () => {
    if (!selectedAnswer) return "border-gray-300";
    return selectedAnswer.isCorrect 
      ? "border-green-500 bg-green-50" 
      : "border-red-500 bg-red-50";
  };

  const getFeedbackTextStyle = () => {
    if (!selectedAnswer) return "text-gray-700";
    return selectedAnswer.isCorrect ? "text-green-700" : "text-red-700";
  };


  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING_ASSETS:
        return <LoadingSpinner message="Cargando recursos del juego..." />;
      case GameState.WELCOME:
        return (
          <div className="text-center bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{GAME_TITLE}</h1>
            {images[IMAGE_PROMPT_KEYS.THEMATIC_IMAGE] && (
              <img 
                src={images[IMAGE_PROMPT_KEYS.THEMATIC_IMAGE]!} 
                alt="Bolsa de Horas" 
                className="mx-auto my-6 w-40 h-40 object-contain rounded-lg shadow-md"
              />
            )}
            <p className="text-lg text-gray-600 mb-8">
              Pon a prueba tus conocimientos sobre el criterio "Bolsa de Horas" en la contratación pública.
            </p>
            <button
              onClick={startGame}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Comenzar Juego
            </button>
          </div>
        );
      case GameState.PLAYING:
        if (questions.length === 0) return <LoadingSpinner message="Cargando preguntas..." />;
        return (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            isShowingFeedback={false}
          />
        );
      case GameState.SHOW_FEEDBACK:
        return (
           <div className={`p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-2xl ${getFeedbackCardStyle()}`}>
            <QuestionCard
              question={questions[currentQuestionIndex]}
              onAnswer={() => {}} // No action on click when showing feedback
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              isShowingFeedback={true} // Disable buttons in QuestionCard
            />
            <div className="mt-6 p-4 rounded-lg bg-opacity-50">
              <div className="flex items-center mb-2">
                {selectedAnswer?.isCorrect && images[IMAGE_PROMPT_KEYS.CORRECT_ICON] && (
                  <img src={images[IMAGE_PROMPT_KEYS.CORRECT_ICON]!} alt="Correcto" className="w-8 h-8 mr-2"/>
                )}
                {!selectedAnswer?.isCorrect && images[IMAGE_PROMPT_KEYS.INCORRECT_ICON] && (
                  <img src={images[IMAGE_PROMPT_KEYS.INCORRECT_ICON]!} alt="Incorrecto" className="w-8 h-8 mr-2"/>
                )}
                <h3 className={`text-xl font-semibold ${getFeedbackTextStyle()}`}>
                  {selectedAnswer?.isCorrect ? "¡Respuesta Correcta!" : "Respuesta Incorrecta"}
                </h3>
              </div>
              <p className={`text-md ${getFeedbackTextStyle()}`}>{feedbackMessage}</p>
            </div>
            <button
              onClick={handleNextQuestion}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </button>
          </div>
        );
      case GameState.FINISHED:
        return (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            onRestart={startGame}
            thematicImage={images[IMAGE_PROMPT_KEYS.THEMATIC_IMAGE]}
          />
        );
      default:
        return <p>Estado desconocido</p>;
    }
  };

  const backgroundStyle: React.CSSProperties = images[IMAGE_PROMPT_KEYS.MAIN_BACKGROUND] 
    ? { backgroundImage: `url(${images[IMAGE_PROMPT_KEYS.MAIN_BACKGROUND]})` } 
    : { backgroundColor: '#e0e7ff' }; // Fallback color

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center transition-all duration-1000 ease-in-out" 
      style={backgroundStyle}
    >
      <main className="w-full max-w-3xl mx-auto">
        {renderContent()}
      </main>
      <footer className="w-full text-center p-4 mt-8">
        <p className="text-sm text-gray-600 bg-white/50 backdrop-blur-sm p-2 rounded-md inline-block">
          Un juego interactivo para aprender sobre la contratación pública.
        </p>
      </footer>
    </div>
  );
};

export default App;
