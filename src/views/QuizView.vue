<script setup>
import QuestionSelector from '@/components/QuestionSelector.vue';
import PlayerRow from '@/components/PlayerRow.vue';
import questions from '@/data/questions.json';
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { onMounted, computed } from 'vue';

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiHome } from '@mdi/js';
import router from '@/router';

const game = useGameStore();
const player = usePlayerStore();

onMounted(() => {
  game.importQuestions(questions)
  player.importPlayers()
  // players.forEach(element => {
  //   player.createPlayer(element.name, element.profilePicture)
  // })
  if(player.currentPlayer === null) player.pickNextPlayer()
  if(game.currentQuestion === null) game.pickNextQuestion()
})

const getCurrentRound = computed(() => {
  return player.players.filter(player => player.alreadyPlayed).length
})

const getPhaseName = computed(() => {
  const names = ["Question", "Explication", "Révélation"]
  return names[game.currentPhase]
})

function goHome() {
  router.push("/")
}

</script>

<template>
  <main class="flex items-center h-screen w-full select-none">
    <player-row :players="player.players"/>
    <div class="w-4/5 px-24 h-screen flex-col justify-between">
      <div class="flex justify-between my-10">
        <h1 class="text-5xl font-extrabold text-slate-50 mb-3">BULLSH!T</h1>
        <div>
          <div class="cursor-pointer bg-indigo-900 hover:bg-indigo-800 p-2 rounded-full" @click.prevent="goHome">
            <svg-icon type="mdi" :path="mdiHome" size="30" class="text-white"></svg-icon>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-between items-end">
        <h1 v-if="player.getCurrentPlayer" class="text-slate-100 text-3xl font-semibold mb-5 select-none">Manche {{ getCurrentRound }} : {{ player.getCurrentPlayer.name }}</h1>
        <p class="text-slate-100 text-xl mb-5">{{ getPhaseName }}</p>
      </div>
      <div v-if="game.questions && player.getCurrentPlayer">
        <question-selector :question="game.currentQuestion" :player="player.getCurrentPlayer" />
        <div class="p-3 px-10 w-full rounded bg-slate-100 mt-5 text-center" v-if="game.currentPhase === 2">
          {{ game.currentQuestion.explanation }}
        </div>
      </div>
    </div>
  </main>
</template>
