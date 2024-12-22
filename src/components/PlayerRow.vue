<script setup>
import PlayerId from './PlayerId.vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiThumbUp, mdiThumbDown } from '@mdi/js';
import { useGameStore } from '@/stores/game';
import { usePlayerStore } from '@/stores/player';

const game = useGameStore()
const playerStore = usePlayerStore()

const props = defineProps({
  players: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <section class="flex flex-col bg-slate-100 h-screen justify-center w-1/3 min-w-[350px] select-none">
    <div v-for="player in props.players" :key="player.id" class="flex gap-3 py-5 px-5 items-center justify-between border-t first:border-t-0 ">
      <div class="flex gap-3 items-center">
        <player-id :player="player" class=""/>
        <p class="font-medium">{{ player.name }}</p>
      </div>
      <div class="flex justify-between gap-5">
        <div class="flex flex-col items-end">
          <p class="">{{ player.score }} point{{ player.score > 1 ? 's':''}}</p>
          <p class="">{{ player.ratio }} %</p>
        </div>
        <div class="flex gap-2">
          <div
            class="h-10 w-10 rounded-full cursor-pointer flex justify-center items-center transition-all"
            :class="[game.currentPhase !== 1 || player.id === playerStore.currentPlayer ? 'bg-indigo-100 hover:bg-indigo-100':player.currentGuess !== null ? player.currentGuess ? 'bg-emerald-500':'bg-indigo-100':'bg-emerald-400 hover:bg-emerald-500']"
            @click="playerStore.selectGuess(player.id, true)"
          >
            <div class="text-white"><svg-icon type="mdi" :path="mdiThumbUp" size="20"></svg-icon></div>
          </div>
          <div
            class="h-10 w-10 rounded-full cursor-pointer flex justify-center items-center transition-all"
            :class="[game.currentPhase !== 1 || player.id === playerStore.currentPlayer ? 'bg-indigo-100 hover:bg-indigo-100':player.currentGuess !== null ? !player.currentGuess ? 'bg-red-500':'bg-indigo-100':'bg-red-400 hover:bg-red-500']"
            @click="playerStore.selectGuess(player.id, false)"
          >
            <div class="text-white"><svg-icon type="mdi" :path="mdiThumbDown" size="20"></svg-icon></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
