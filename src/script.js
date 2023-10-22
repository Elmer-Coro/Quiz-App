const questions = [
  {
    question: "¿Cuál es el propósito principal de JavaScript en un sitio web?",
    options: [
      "Estilizar la página web",
      "Mejorar la accesibilidad",
      "Agregar interactividad y funcionalidad",
      "Organizar la estructura del sitio",
    ],
    correctAnswer: "c",
  },
  {
    question:
      "¿Cuál de las siguientes no es una forma de declarar una variable en JavaScript?",
    options: ["var", "let", "const", "new"],
    correctAnswer: "d",
  },
  {
    question:
      "¿Qué método se utiliza para imprimir un mensaje en la consola del navegador?",
    options: ["console.log()", "print()", "log()", "display()"],
    correctAnswer: "a",
  },
  {
    question: "¿Qué hace el operador '===' en JavaScript?",
    options: [
      "Compara dos valores para ver si son iguales, sin tener en cuenta el tipo de dato",
      "Compara dos valores para ver si son iguales, teniendo en cuenta el tipo de dato",
      "Asigna un valor a una variable",
      "Ninguna de las anteriores",
    ],
    correctAnswer: "b",
  },
  {
    question:
      "¿Cuál de las siguientes no es una estructura de control en JavaScript?",
    options: ["if...else", "loop", "switch", "function"],
    correctAnswer: "b",
  },
  {
    question:
      "¿Qué método se utiliza para agregar un elemento al final de un arreglo en JavaScript?",
    options: ["push()", "add()", "append()", "concat()"],
    correctAnswer: "a",
  },
  {
    question: "¿Qué es el DOM en JavaScript?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Dynamic Object Model",
    ],
    correctAnswer: "a",
  },
];

let currentQuestion = 0;
const answers = [];
const quizContainer = document.querySelector(".quiz-container");
const nextButton = document.querySelector(".next");

function loadQuestion(questionIndex) {
  const currentQuestionData = questions[questionIndex];
  quizContainer.querySelector("h2").textContent = currentQuestionData.question;

  const optionsContainer = quizContainer.querySelector(".options");
  optionsContainer.innerHTML = "";

  currentQuestionData.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `${option} <input type="radio" name="q${questionIndex}" value="${String.fromCharCode(
      97 + index
    )}">`;
    optionsContainer.appendChild(label);
  });
}

function checkAnswer(questionIndex) {
  const selectedOption = quizContainer.querySelector(
    `input[name=q${questionIndex}]:checked`
  );

  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = questions[questionIndex].correctAnswer;

    answers.push({
      question: questions[questionIndex].question,
      userAnswer,
      correctAnswer,
      correct: userAnswer === correctAnswer,
    });

    // Después de registrar la respuesta, limpiamos el input seleccionado
    selectedOption.checked = false;

    // Si hemos alcanzado la última pregunta, mostramos las respuestas
    if (questionIndex === questions.length - 1) {
      showAnswers();
    }
  } else {
    alert("Por favor selecciona una opcion");
  }
}

nextButton.addEventListener("click", () => {
  checkAnswer(currentQuestion);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    alert("¡Has completado el quiz!");
  }
});

function showAnswers() {
  // Deshabilitamos todos los inputs para evitar cambios después de responder
  const inputs = quizContainer.querySelectorAll("input[type='radio']");
  inputs.forEach((input) => (input.disabled = true));

  // Creamos un elemento para mostrar las respuestas
  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");

  answers.forEach((answer) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    const question = document.createElement("p");
    question.textContent = `Pregunta: ${answer.question}`;
    resultItem.appendChild(question);

    const userAnswer = document.createElement("p");
    userAnswer.textContent = `Tu Respuesta: ${answer.userAnswer}`;
    resultItem.appendChild(userAnswer);

    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Respuesta Correcta: ${answer.correctAnswer}`;
    resultItem.appendChild(correctAnswer);

    if (answer.correct) {
      resultItem.style.backgroundColor = "#a7ebaf";
    } else {
      resultItem.style.backgroundColor = "#ffa0a0";
      resultItem.style.border = "2px solid #ffa3a3";
    }

    resultContainer.appendChild(resultItem);
  });

  quizContainer.appendChild(resultContainer);
}

loadQuestion(currentQuestion);
