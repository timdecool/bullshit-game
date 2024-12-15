<script setup>
import PlayerId from './PlayerId.vue';

const props = defineProps({
  players: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <section class="flex flex-col gap-5 bg-slate-50 p-4 rounded">
    <div v-for="player in players" :key="player.id">
      <player-id :player="player" />
    </div>
  </section>
</template>
