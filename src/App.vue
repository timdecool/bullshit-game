<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <div class="h-screen bg-indigo-900">

    <RouterView />

  </div>


  <!-- <div v-for="question in questions" :key="question.id">
    <h2 class="text-center font-bold text-lg">{{ question.question }}</h2>
    <div v-for="answer in question.answers" :key="answer.id" class="p-3 border border-red-500 m-3 cursor-pointer text-center" @click="reveal(answer)">
      {{ answer.text }}
    </div>
  </div> -->
</template>

<style scoped>
</style>
