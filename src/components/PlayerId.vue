<script setup>

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
  }
})

</script>

<template>
  <div class="flex flex-col gap-1 items-center">
    <div class="rounded-full overflow-hidden flex justify-center items-center" :class="[big ? 'h-24 w-24':'h-12 w-12']">
      <img :src="player.picture" alt="player picture" class="object-cover w-full"/>
    </div>
    <div class="text-black font-semibold">{{ player.name }}</div>
  </div>
</template>
