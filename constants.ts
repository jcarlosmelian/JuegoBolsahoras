
import { QuestionData, ImagePrompt } from './types';

export const GAME_TITLE = "Desafío de la Bolsa de Horas";

export const IMAGE_PROMPT_KEYS = {
  MAIN_BACKGROUND: 'mainBackground',
  THEMATIC_IMAGE: 'thematicImage',
  CORRECT_ICON: 'correctIcon',
  INCORRECT_ICON: 'incorrectIcon',
};

export const IMAGE_PROMPTS: ImagePrompt[] = [
  { key: IMAGE_PROMPT_KEYS.MAIN_BACKGROUND, prompt: "Abstract background with subtle legal or contract-themed motifs, blues and grays, elegant and professional, digital art, widescreen." },
  { key: IMAGE_PROMPT_KEYS.THEMATIC_IMAGE, prompt: "Stylized depiction of an hourglass intertwined with a contract document, symbolizing time management in legal agreements, modern flat design, vibrant accents on a neutral base." },
  { key: IMAGE_PROMPT_KEYS.CORRECT_ICON, prompt: "Clean, modern green checkmark icon, 3D effect, isolated on a transparent background." },
  { key: IMAGE_PROMPT_KEYS.INCORRECT_ICON, prompt: "Clean, modern red X (cross) icon, 3D effect, isolated on a transparent background." },
];

export const QUESTIONS: QuestionData[] = [
  {
    id: 1,
    text: "¿Es admisible que un licitador ofrezca 'horas gratuitas' como parte de la 'Bolsa de Horas'?",
    options: [
      { text: "Sí, siempre que el servicio principal tenga un precio y se cumplan otros requisitos.", isCorrect: true },
      { text: "No, porque viola el principio de onerosidad de los contratos.", isCorrect: false },
      { text: "Solo si las horas gratuitas no superan el 1% del contrato.", isCorrect: false },
    ],
    explanation: "Correcto. Varios tribunales (TACRC, TARCJA) han confirmado que es admisible, ya que la onerosidad reside en la existencia de un precio cierto para el servicio principal, y las 'horas gratuitas' se consideran parte de una oferta global."
  },
  {
    id: 2,
    text: "Al preparar un pliego para un servicio de consultoría que incluye la 'Bolsa de Horas', ¿qué es crucial establecer para asegurar la viabilidad y comparabilidad de las ofertas?",
    options: [
      { text: "Un límite máximo de horas ofertables y parámetros objetivos para evaluar la viabilidad.", isCorrect: true },
      { text: "Permitir ofertas sin límite de horas para fomentar la máxima competencia.", isCorrect: false },
      { text: "Indicar que las horas son 'a discreción del contratista'.", isCorrect: false },
    ],
    explanation: "Correcto. Es fundamental establecer límites y parámetros claros para evitar ofertas desproporcionadas o inviables, garantizar la comparabilidad y asegurar que el criterio sea controlable."
  },
  {
    id: 3,
    text: "Si la 'Bolsa de Horas' se configura como una 'mejora', y los criterios sujetos a juicio de valor (subjetivos) tienen más peso que los objetivos, ¿qué limitación de valoración es importante recordar?",
    options: [
      { text: "No podrá asignársele una valoración superior al 2,5% del total.", isCorrect: true },
      { text: "No debe superar el 10% del valor del contrato.", isCorrect: false },
      { text: "No hay limitación específica para las mejoras, solo para criterios de adjudicación.", isCorrect: false },
    ],
    explanation: "Correcto. El documento menciona que para las mejoras, en ciertos contextos (predominio de criterios subjetivos), la valoración no puede superar el 2,5%."
  },
  {
    id: 4,
    text: "Un licitador ofrece una 'Bolsa de Horas' muy elevada, sin un límite claro en el pliego. ¿Cuál es el principal riesgo?",
    options: [
      { text: "La oferta podría ser inviable, distorsionar la competencia, y el criterio podría ser anulado.", isCorrect: true },
      { text: "Es una excelente oferta que demuestra el máximo compromiso del licitador.", isCorrect: false },
      { text: "Se debe aceptar sin más, ya que beneficia económicamente a la Administración.", isCorrect: false },
    ],
    explanation: "Correcto. La ausencia de límites puede llevar a ofertas desmesuradas, poner en riesgo la ejecución del contrato y ha sido motivo de anulación de criterios por tribunales como TACCM y OARC por falta de racionalidad o proporcionalidad."
  },
  {
    id: 5,
    text: "¿La 'Bolsa de Horas' siempre representa una mayor calidad en la prestación del servicio?",
    options: [
      { text: "Puede representar mayor calidad si refuerza la ejecución y garantiza el servicio sin sobrecoste, especialmente en contratos que requieren vigilancia.", isCorrect: true },
      { text: "No, es solo una forma encubierta de obtener servicios más baratos a expensas del licitador.", isCorrect: false },
      { text: "Sí, automáticamente cualquier hora adicional ofrecida es sinónimo de mayor calidad.", isCorrect: false },
    ],
    explanation: "Correcto. El TACPC (Canarias) considera que puede ser un criterio que garantice la máxima calidad posible del servicio, coadyuvando a la estabilidad presupuestaria y control del gasto, si está bien configurado."
  },
  {
    id: 6,
    text: "El pliego menciona 'Bolsa de Horas anuales'. Un licitador presenta su oferta calculando las horas para toda la duración del contrato (ej. 3 años) en lugar de anualmente. ¿Es esto correcto?",
    options: [
      { text: "No, si el pliego especifica 'anuales', la oferta debe ajustarse a esa periodicidad para evitar confusiones y asegurar la correcta valoración.", isCorrect: true },
      { text: "Sí, ofrecer más horas acumuladas siempre es mejor y más fácil de gestionar.", isCorrect: false },
      { text: "Es irrelevante, la Administración ajustará las horas según necesidad sin importar cómo se oferten.", isCorrect: false },
    ],
    explanation: "Correcto. Es crucial la claridad en los pliegos y que las ofertas se ajusten a lo especificado (anual, total, por lote) para evitar problemas de interpretación y valoración."
  }
];
