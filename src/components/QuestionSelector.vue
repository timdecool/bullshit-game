<script setup>
  import { computed, ref } from 'vue';
  import PlayerId from './PlayerId.vue';

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

  const revealedOutcome = ref(false)
  const selectedAnswer = ref(0)

  function selectAnswer(id) {
    selectedAnswer.value = id
  }

  function revealOutcome() {
    revealedOutcome.value = !revealedOutcome.value
  }

</script>

<template>
  <section class="flex items-start justify-center gap-4 w-full">

    <div class="flex flex-col items-center bg-slate-50 p-10 py-5 rounded w-1/2 min-w-96 text-center shadow-lg">
      <div class="flex w-full justify-between items-center mb-10">
        <div>Question {{ question.level }}</div>
        <player-id :player="player" big />
        <div>{{ question.level * 100 }} points</div>
      </div>

      <h1 class="text-lg font-bold mb-5">{{ question.question }}</h1>

      <div v-for="answer in question.answers" :key="answer.id" class="w-full">
        <div
          class="py-3 my-2 w-full rounded cursor-pointer text-lg transition-all shadow-md"
          :class="[revealedOutcome ? answer.correct ? 'bg-green-500':'bg-red-500':answer.id == selectedAnswer ? 'bg-indigo-300':'bg-indigo-100 hover:bg-indigo-200']"
          @click="selectAnswer(answer.id)"
        >
          {{ answer.text }}
        </div>
      </div>
      <div class="py-2 mt-5 w-full rounded cursor-pointer bg-slate-200 w-full" @click="revealOutcome()">Révéler la réponse</div>

    </div>

  </section>
</template>
