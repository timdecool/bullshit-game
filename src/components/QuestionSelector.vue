<script setup>
  import router from '@/router';
import PlayerId from './PlayerId.vue';
  import { useGameStore } from '@/stores/game';
  import { usePlayerStore } from '@/stores/player';
  const game = useGameStore()
  const playerStore = usePlayerStore()

  const props = defineProps({
    question: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <section class="flex items-start justify-center gap-4 w-full select-none">

    <div class="flex flex-col items-center bg-slate-100 p-10 py-5 rounded w-full text-center shadow-lg">
      <div class="flex w-full justify-between items-start mb-10">
        <div>Question {{ game.currentLevel }}</div>
        <player-id :player="player" big />
        <div>{{ game.currentLevel * 100 }} points</div>
      </div>

      <h1 class="text-xl font-bold mb-5">{{ question.question }}</h1>

      <div v-for="answer in props.question.answers" :key="answer.id" class="w-full">
        <div
          class="py-3 my-2 w-full rounded text-lg transition-all shadow-md font-medium"
          :class="[game.currentPhase === 2 ? answer.correct ? 'bg-emerald-400':'bg-indigo-100':answer.id == game.currentAnswer ? 'bg-indigo-300':game.currentPhase === 0 ? 'bg-indigo-100 hover:bg-indigo-200 cursor-pointer':'bg-indigo-100']"
          @click="game.selectAnswer(answer.id)"
        >
          {{ answer.text }}
        </div>
      </div>
      <div class="py-2 mt-5 rounded bg-slate-200 w-full" @click="game.revealAnswer()" v-if="game.currentPhase < 2" :class="[game.currentPhase < 1 ? 'text-neutral-300':'text-neutral-900 cursor-pointer']">
        Révéler la réponse
      </div>
      <div class="py-2 mt-5 rounded bg-slate-200 text-neutral-900 w-full cursor-pointer" @click="router.push('/end')" v-else-if="(game.isRoundLost || game.currentLevel === 5) && playerStore.getNumberOfRemainingPlayers === 0">
        Résultats finaux
      </div>
      <div class="py-2 mt-5 rounded bg-slate-200 text-neutral-900 w-full cursor-pointer" @click="game.pickNextQuestion()" v-else>
        {{ game.isRoundLost || game.currentLevel === 5 ? 'Prochaine manche':'Prochaine question'}}
      </div>
    </div>

  </section>
</template>
