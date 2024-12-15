import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', () => {

  const currentId = ref(0)
  const players = ref([])
  const currentPlayer = ref(0)

  function createPlayer(name, picture) {
    currentId.value++
    const player = {
      "id": currentId.value,
      "name": name,
      "picture": picture,
      "score": 0,
      "correctGuesses": 0,
      "alreadyPlayed": false
    }

    console.log(player)
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
    if(id) {
      console.log("ok")
      currentPlayer.value = id
      toggleAlreadyPlayed(id)
    }
  }

  const getCurrentPlayer = computed(() => {
    return players.value.find(player => player.id === currentPlayer.value)
  })

  const getOtherPlayers = computed(() => {
    return players.value.filter(player => player.id !== currentPlayer.value)
  })

  return { players, createPlayer, deletePlayer, addScore, addCorrectGuess, toggleAlreadyPlayed, pickNextPlayer, getCurrentPlayer, getOtherPlayers }
})
