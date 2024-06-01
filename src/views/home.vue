<script lang="ts" setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import Welcome from './components/Welcome.vue'
import SongList from './components/SongList.vue'
import BottomPlay from './components/BottomPlay.vue'
import lyrics from './lyrics.vue'

const audio = ref()
</script>

<template>
  <div w-full h-full relative>
    <SearchBar />
    <Welcome />
    <SongList />
    <BottomPlay ref="audio" absolute bottom-0 />
    <lyrics :audio="audio?.value?.audio" />
  </div>
</template>
