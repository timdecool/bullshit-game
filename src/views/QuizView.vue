<script setup>
import QuestionSelector from '@/components/QuestionSelector.vue';
import PlayerRow from '@/components/PlayerRow.vue';
import questions from '@/data/questions.json';
import players from '@/data/players.json';
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';
import { onMounted } from 'vue';

const game = useGameStore();
const player = usePlayerStore();

onMounted(() => {
  game.importQuestions(questions)
  players.forEach(element => {
    player.createPlayer(element.name, element.profilePicture)
  })

  player.pickNextPlayer(5)
  game.pickNextQuestion()
  console.log(player.getCurrentPlayer)
})

</script>

<template>
  <main class="flex justify-center items-center h-screen">

    <player-row :players="player.getOtherPlayers"/>
    <div>

      <div v-if="game.questions && player.getCurrentPlayer">
        <question-selector :question="game.currentQuestion" :player="player.getCurrentPlayer" />
      </div>

    </div>



  </main>

</template>
