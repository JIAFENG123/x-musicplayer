<script lang='ts' setup>
import { ref } from 'vue'
import emitter from '../eventBus'

const searchVal = ref('')
const opened = ref(false)
function openSearch() {
  if (opened.value && searchVal.value)
    emitter.emit('search', searchVal.value)

  else opened.value = !opened.value
}
</script>

<template>
  <div flex justify-between px-5 py-6>
    <section w-11 h-11 bg="#C67D0F30" rounded="1/2" flex justify-center items-center>
      <img src="@/assets/header.png" alt="">
    </section>
    <section flex justify-center items-center :b="opened ? 'b-1.5 b-blue-4 b-solid' : 'none'">
      <input
        v-model="searchVal"
        :w="opened ? 54 : 0" border-none outline-none transition="all" duration="450" type="text"
        placeholder="Search"
      >
      <section w="11" h="11" bg="#9570FF30" rounded="1/2" flex justify-center items-center>
        <svg
          xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"
          @click="openSearch"
        >
          <path
            d="M19.5822 18.3361L16.3265 15.1067C17.5903 13.531 18.2023 11.531 18.0367 9.51787C17.8711 7.50477 16.9405 5.63162 15.4363 4.28358C13.932 2.93554 11.9684 2.21507 9.94929 2.27032C7.93015 2.32557 6.00891 3.15234 4.58063 4.58063C3.15234 6.00891 2.32557 7.93015 2.27032 9.94929C2.21507 11.9684 2.93554 13.932 4.28358 15.4363C5.63162 16.9405 7.50477 17.8711 9.51787 18.0367C11.531 18.2023 13.531 17.5903 15.1067 16.3265L18.3361 19.5559C18.4177 19.6382 18.5148 19.7034 18.6217 19.748C18.7286 19.7926 18.8433 19.8155 18.9592 19.8155C19.075 19.8155 19.1897 19.7926 19.2967 19.748C19.4036 19.7034 19.5007 19.6382 19.5822 19.5559C19.7404 19.3923 19.8288 19.1736 19.8288 18.946C19.8288 18.7184 19.7404 18.4998 19.5822 18.3361ZM10.1837 16.3265C8.96872 16.3265 7.78106 15.9663 6.77088 15.2913C5.76069 14.6163 4.97334 13.6569 4.5084 12.5344C4.04347 11.412 3.92182 10.1769 4.15884 8.98525C4.39586 7.79366 4.98092 6.6991 5.84001 5.84001C6.6991 4.98092 7.79366 4.39586 8.98525 4.15884C10.1769 3.92182 11.412 4.04347 12.5344 4.5084C13.6569 4.97334 14.6163 5.76069 15.2913 6.77088C15.9663 7.78106 16.3265 8.96872 16.3265 10.1837C16.3265 11.8129 15.6793 13.3753 14.5273 14.5273C13.3753 15.6793 11.8129 16.3265 10.1837 16.3265Z"
            fill="#333333"
          />
        </svg>
      </section>
    </section>
  </div>
</template>

<style scoped lang='scss'></style>
