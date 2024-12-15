import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePlayerStore } from './player'

export const useGameStore = defineStore('game', () => {

  const playerStore = usePlayerStore()

  const questions = ref([])

  const currentLevel = ref(0)
  const currentQuestion = ref({})

  function importQuestions(questionData) {
    questions.value = questionData
  }

  function pickNextQuestion() {
    currentLevel.value++
    const pickedQuestions = questions.value.filter(question => question.level === currentLevel.value && !question.alreadyAsked)
    const question = pickedQuestions[Math.floor(Math.random() * pickedQuestions.length)]
    currentQuestion.value = question
    question.alreadyAsked = true
  }

  const getTotalQuestionsAsked = computed(() => {
    return questions.value.filter(question => question.alreadyAsked).length
  })

  const getBestPlayer = computed(() => {

  })


  return { importQuestions, pickNextQuestion, questions, currentQuestion }
})
