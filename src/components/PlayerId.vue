<script setup>
import { usePlayerStore } from '@/stores/player';
const playerStore = usePlayerStore()

const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  big: {
    type: Boolean,
    required: false,
    default: function() {
      return false
    }
  },
  delete: {
    type: Boolean,
    required: false,
    default: function() {
      return false
    }
  }
})

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiClose, mdiTrophyVariant } from '@mdi/js';

</script>

<template>
  <div class="flex flex-col gap-1 items-center relative">
    <div v-if="props.delete" class="h-6 w-6 bg-red-500 absolute -left-2 -top-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-red-400" @click="playerStore.deletePlayer(player.id)">
      <svg-icon type="mdi" :path="mdiClose" size="20" class="text-slate-50"></svg-icon>
    </div>
    <div v-else-if="player.id === playerStore.getBestPlayer" class="h-6 w-6 bg-yellow-500 absolute -left-2 -top-2 rounded-full flex justify-center items-center">
      <svg-icon type="mdi" :path="mdiTrophyVariant" size="16" class="text-slate-50"></svg-icon>
    </div>
    <div class="rounded overflow-hidden flex justify-center items-center" :class="[big ? 'h-24 w-24':'h-12 w-12']">
      <img :src="player.picture" alt="player picture" class="object-cover w-full"/>
    </div>
  </div>
</template>
