import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'O que é um dicionário em Python?',
    options: ['Uma estrutura de dados', 'É uma função', 'Uma estrutura de controle', 'É um loop infinito'],
    correctAnswer: 'Uma estrutura de dados',
  },
  {
    question: 'Complete a frase: "Tudo em Python é:"',
    options: ['Compilado', 'Um Loop', 'Um módulo', 'Um Objeto'],
    correctAnswer: 'Um Objeto',
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10); // Tempo em segundos
  const [timerOn, setTimerOn] = useState(true);

  useEffect(() => {
    let interval;
    if (timerOn && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleAnswer(null); // Responder automaticamente quando o tempo acabar
    }

    return () => clearInterval(interval);
  }, [timer, timerOn]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10); // Reiniciar o temporizador para a próxima pergunta
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Seus acertos: {score} / {questions.length}</Text>
          <TouchableOpacity onPress={resetQuiz} style={[styles.button, { backgroundColor: '#9C27B0' }]}>
            <Text style={styles.buttonText}>Jogar Novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={[styles.questionText, { color: 'black' }]}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, { backgroundColor: '#9C27B0' }]}
              onPress={() => {
                setTimerOn(false); // Parar o temporizador quando uma opção for selecionada
                handleAnswer(option);
              }}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.timerText}>Tempo restante: {timer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  optionButton: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#9C27B0',
  },
  button: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  timerText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QuizApp;
