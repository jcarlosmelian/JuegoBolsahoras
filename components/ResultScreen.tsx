
import React from 'react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  thematicImage: string | null;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart, thematicImage }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  let message = "";
  if (percentage === 100) {
    message = "¡Felicidades! Eres un experto en la Bolsa de Horas.";
  } else if (percentage >= 75) {
    message = "¡Muy bien hecho! Tienes un gran conocimiento.";
  } else if (percentage >= 50) {
    message = "¡Buen intento! Sigue aprendiendo sobre la Bolsa de Horas.";
  } else {
    message = "Necesitas repasar un poco más. ¡No te rindas!";
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-xl text-center transform transition-all duration-500 ease-in-out">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Juego Terminado</h2>
      {thematicImage && (
        <div className="my-6 flex justify-center">
          <img src={thematicImage} alt="Imagen Temática del Juego" className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg shadow-md" />
        </div>
      )}
      <p className="text-xl text-gray-700 mb-2">Tu puntuación final es:</p>
      <p className="text-5xl font-extrabold text-blue-600 mb-4">{score} / {totalQuestions}</p>
      <p className="text-2xl text-gray-700 mb-6">{message} ({percentage}%)</p>
      <button
        onClick={onRestart}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default ResultScreen;
