<script setup>
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue';
import PlayerId from '@/components/PlayerId.vue';
import router from '@/router';
const player = usePlayerStore()

const bestPlayer = computed(() => {
  return player.players.find(p => p.id === player.getBestPlayer)
})

function restart() {
  player.resetPlayers()
  router.push("/quiz")
}



</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <section class="select-none w-1/2">
      <h1 class="text-5xl font-extrabold text-slate-50 mb-3">BULLSH!T</h1>
      <div class="bg-slate-100 rounded pt-5 pb-3 px-3">
        <div v-if="bestPlayer" class="flex flex-col items-center gap-3">
          <h2 class="text-xl font-medium mb-5">La victoire revient à {{ bestPlayer.name }} !</h2>
          <div class="flex">
            <player-id :player="bestPlayer" big />
          </div>
          <div class="text-center">
            <p>{{ bestPlayer.score }} points</p>
            <p>{{ bestPlayer.ratio }} % de précision</p>
          </div>
          <div class="flex gap-5">
            <div class="bg-indigo-900 text-slate-50 px-10 py-3 text-center rounded cursor-pointer hover:bg-indigo-800 mt-5 transition-all" @click.prevent="restart">Rejouer</div>
            <div class="bg-indigo-900 text-slate-50 px-10 py-3 text-center rounded cursor-pointer hover:bg-indigo-800 mt-5 transition-all" @click.prevent="router.push('/')">Retour au menu</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
