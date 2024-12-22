import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {

  const currentId = ref(0)
  const players = ref([])
  const currentPlayer = ref(null)

  function createPlayer(name, picture) {
    currentId.value++
    const player = {
      "id": currentId.value,
      "name": name,
      "picture": picture,
      "score": 0,
      "correctGuesses": 0,
      "totalGuesses": 0,
      "ratio": 0,
      "alreadyPlayed": false,
      "currentGuess": null
    }

    players.value.push(player)
  }

  function deletePlayer(id) {
    players.value = players.value.filter(player => player.id !== id)
  }

  function selectPlayer(id) {
    return players.value.find(player => player.id == id)
  }

  function addScore(id, score) {
    const player = selectPlayer(id)
    if(player) player.score += score
  }

  function addCorrectGuess(id) {
    const player = selectPlayer(id)
    if(player) player.correctGuesses++
  }

  function toggleAlreadyPlayed(id) {
    const player = selectPlayer(id)
    if(player) player.alreadyPlayed = !player.alreadyPlayed
  }

  function pickNextPlayer(id = null) {
    if(!id) {
      id = getBestGuesser.value
    }
    currentPlayer.value = id
    toggleAlreadyPlayed(id)
  }

  function selectGuess(id, guess) {
    const player = selectPlayer(id)
    player.currentGuess = guess
  }

  function resetPlayers() {
    players.value.map((p) => {
      p.correctGuesses = 0
      p.totalGuesses = 0
      p.ratio = 0
      p.alreadyPlayed = 0
      p.score = 0
      p.currentGuess = null
      currentPlayer.value = null
    })

  }

  const getCurrentPlayer = computed(() => {
    return players.value.find(player => player.id === currentPlayer.value)
  })

  const getOtherPlayers = computed(() => {
    return players.value.filter(player => player.id !== currentPlayer.value)
  })

  const getIsTrusted = computed(() => {
    return getOtherPlayers.value.filter(player => player.currentGuess).length > getOtherPlayers.value.length/2
  })

  const getBestGuesser = computed(() => {
    const remainingPlayers = getOtherPlayers.value.filter(player => !player.alreadyPlayed)
    remainingPlayers.sort((a,b) => b.ratio - a.ratio)
    return remainingPlayers.length > 0 ? remainingPlayers[0].id:players.value[0]
  })

  const getBestPlayer = computed(() => {
    const allPlayers = players.value
    allPlayers.sort((a,b) => b.score - a.score)
    return allPlayers[0].id
  })

  const getNumberOfRemainingPlayers = computed(() => {
    return players.value.filter(player => !player.alreadyPlayed).length
  })

  return { players, createPlayer, deletePlayer, addScore, addCorrectGuess, toggleAlreadyPlayed, pickNextPlayer, getCurrentPlayer, getOtherPlayers, currentId, selectGuess, selectPlayer, currentPlayer, getIsTrusted, getBestPlayer, getNumberOfRemainingPlayers, resetPlayers }
})
