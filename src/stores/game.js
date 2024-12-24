import { ref } from 'vue'
import { defineStore } from 'pinia'
import { usePlayerStore } from './player'

export const useGameStore = defineStore('game', () => {

  const player = usePlayerStore()

  const questions = ref([])

  const currentLevel = ref(0)
  const currentQuestion = ref(null)
  const currentAnswer = ref(0)
  const currentPhase = ref(0)
  const isRoundLost = ref(false)


  function importQuestions(questionData) {
    questions.value = questionData
  }

  function pickNextQuestion() {
    currentPhase.value = 0

    if(isRoundLost.value || currentLevel.value === 5) {
      isRoundLost.value = false
      player.pickNextPlayer()
      currentLevel.value = 1
    }
    else {
      currentLevel.value++
    }

    const pickedQuestions = questions.value.filter(question => !question.alreadyAsked)
    if(pickedQuestions.length > 0) {
      const question = pickedQuestions[Math.floor(Math.random() * pickedQuestions.length)]
      currentQuestion.value = question
      question.alreadyAsked = true
    }
  }

  function selectAnswer(id) {
    if(currentPhase.value === 0) {
      currentAnswer.value = id
      currentPhase.value++
    }
  }

  function revealAnswer() {
    if(currentPhase.value === 1) {
      currentPhase.value++
      const correctAnswer = currentQuestion.value.answers.filter(answer => answer.correct)[0].id === currentAnswer.value
      if(correctAnswer) {
        const currentPlayer = player.selectPlayer(player.currentPlayer)
        currentPlayer.score += currentLevel.value * 100
      }
      else {
        isRoundLost.value = !player.getIsTrusted
      }

      player.getOtherPlayers.filter(player => player.currentGuess === correctAnswer).map((player) => {
        player.score += 100
        player.correctGuesses++
      })
      player.getOtherPlayers.map((player) => {
        player.totalGuesses++
        player.currentGuess = null
        player.ratio = Math.floor(player.correctGuesses / player.totalGuesses * 100)
      })
    }
  }

  function resetGame() {
    currentLevel.value = 0
    currentQuestion.value = null
    currentAnswer.value = 0
    currentPhase.value = 0

  }

  return { importQuestions, pickNextQuestion, resetGame, questions, currentQuestion, currentAnswer, currentLevel, selectAnswer, currentPhase, revealAnswer, isRoundLost }
})
