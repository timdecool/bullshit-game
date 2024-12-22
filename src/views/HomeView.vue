<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight, mdiPlus } from '@mdi/js';
import { ref } from 'vue';
import pictures from '@/data/pictures.json'
import { usePlayerStore } from '@/stores/player';
import PlayerId from '@/components/PlayerId.vue';
import router from '@/router';

const player = usePlayerStore()

const name = ref("")
const picture = ref(0)

function rightPicture() {
  if (picture.value < pictures.length - 1) {
    picture.value++
  }
  else {
    picture.value = 0
  }
}

function leftPicture() {
  if(picture.value > 0) {
    picture.value--
  }
  else {
    picture.value = pictures.length - 1
  }
}

function createPlayer() {
  player.createPlayer(name.value, pictures[picture.value].src)
  name.value = ""
  picture.value = 0
}

function startGame() {
  router.push("/quiz")
}
</script>

<template>
  <main class="flex justify-center items-center h-screen">
    <section class="select-none w-1/2">
      <h1 class="text-5xl font-extrabold text-slate-50 mb-3">BULLSH!T</h1>
      <div class="bg-slate-100 rounded pt-5 pb-3 px-3">
        <div class="px-2 h-20">
          <div v-if="player.players.length > 0" class="flex gap-10 items-center w-full justify-center">
            <div v-for="player in player.players" :key="player.id" class="flex flex-col items-center">
              <div class="flex">
                <player-id :player="player" delete/>
              </div>
              <p class="text-center">{{ player.name }}</p>
            </div>
          </div>
          <div v-else class="text-center w-full">
            Créez des joueurs pour jouer.
          </div>
        </div>
        <form class="flex flex-col items-center gap-3 mt-5" @submit.prevent="createPlayer">
          <div class="flex gap-3 items-center">
            <svg-icon type="mdi" :path="mdiChevronLeft" class="cursor-pointer" size="36" @click="leftPicture"></svg-icon>
            <div class="h-24 w-24 rounded-lg overflow-hidden">
              <img :src="pictures[picture].src" :title="pictures[picture].title" class="object-cover w-full" />
            </div>
            <svg-icon type="mdi" :path="mdiChevronRight" class="cursor-pointer" size="36" @click="rightPicture"></svg-icon>
          </div>
          <div class="flex gap-2">
            <input type="text" class="text-center rounded p-2 focus:outline-none w-full" v-model="name"/>
            <button class="text-slate-50 bg-indigo-900 hover:bg-indigo-800 active:bg-indigo-200 rounded p-2 transition-all"><svg-icon type="mdi" :path="mdiPlus"></svg-icon></button>
          </div>
        </form>
        <div class="bg-indigo-900 text-slate-50 px-10 py-3 text-center rounded cursor-pointer hover:bg-indigo-800 mt-5 transition-all" @click.prevent="startGame">Démarrer la partie</div>
      </div>
    </section>
  </main>
</template>
