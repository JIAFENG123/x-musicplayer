<script lang="ts" setup>
import SearchBar from './components/SearchBar.vue'
import Welcome from './components/Welcome.vue'
import SongList from './components/SongList.vue'
import BottomPlay from './components/BottomPlay.vue'
</script>

<template>
  <div w-full h-full relative>
    <SearchBar />
    <Welcome />
    <SongList />
    <BottomPlay absolute bottom-0 />
  </div>
</template>
