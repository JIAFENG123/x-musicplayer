<script lang='ts' setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { SongItem } from './typet'
import emitter from './eventBus'

const audior = ref()
const show = ref(false)
const songInfo = ref<SongItem>()
const lyricMap = ref<any>({})
function parseLyricTime(timeString: any, nextTimeString: any) {
  const [, minutes, seconds, milliseconds] = timeString.match(/\[(\d+):(\d+)\.(\d+)\]/)
  const time = Number.parseInt(minutes, 10) * 60 + Number.parseFloat(`${seconds}.${milliseconds}`)

  let duration
  if (nextTimeString) {
    const [, nextMinutes, nextSeconds, nextMilliseconds] = nextTimeString.match(/\[(\d+):(\d+)\.(\d+)\]/)
    const nextTime = Number.parseInt(nextMinutes, 10) * 60 + Number.parseFloat(`${nextSeconds}.${nextMilliseconds}`)
    duration = nextTime - time
  }
  else {
    duration = 1 // 最后一行歌词的持续时间设置为 1 秒
  }

  return { time, duration }
}
const contents = computed(() => {
  return Object.keys(lyricMap.value).map((key, index) => {
    return {
      time: parseLyricTime(key, index < Object.keys(lyricMap.value).length - 1 ? Object.keys(lyricMap.value)[index + 1] : '').time,
      duration: parseLyricTime(key, index < Object.keys(lyricMap.value).length - 1 ? Object.keys(lyricMap.value)[index + 1] : '').duration,
      content: lyricMap.value[key],
    }
  })
})
const currentTime = ref(0)

emitter.on('showLyrics', (params) => {
  const { id, audio } = params as { id: string; audio: HTMLAudioElement }
  audior.value = audio
  audior.value?.addEventListener('timeupdate', () => {
    currentTime.value = audior.value.currentTime
  })
  show.value = true
  lyricMap.value = {}
  const songList = JSON.parse(sessionStorage.getItem('songList') || '[]')
  songInfo.value = songList.find((item: SongItem) => item.id === id)
  const lyric = songInfo.value?.songInfo?.lyric
  if (lyric) {
    // 根据时间分割歌词
    const strs = lyric.split(/\r\n/g)
    for (let i = 0; i < strs.length; i++) {
      const str = strs[i]
      if (str.includes('ti:') || str.includes('ar:')) {
        continue
      }
      else {
        const info = str.match(/\[\d\d:\d\d.\d\d\]/)
        if (info) {
          const time = info[0]
          const content = str.replace(time, '')
          lyricMap.value[time] = content
        }
      }
    }
  }
})
onMounted(() => {
  document.addEventListener('click', () => {
    show.value = false
  })
})
function isLyricActive(lyricTime: number, lyricDuration: number) {
  return currentTime.value >= lyricTime && currentTime.value < (lyricTime + lyricDuration)
}
watch(() => currentTime.value, () => {
  // scrollIntoView
  document.querySelector('.active-line')?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
})
</script>

<template>
  <Transition name="bounce">
    <div v-show="show" fixed overflow-y-auto bottom-0 left-0 z-12 h-90vh w-100vw flex items-center flex-col gap-y-5 py-8 class="muyao bg-[#615EFC]/80 lyric-wrap backdrop-blur-md rounded-t-2xl">
      <Icon style="color:#EEEEEE" class="absolute top-3 right-3 text-2xl" icon="material-symbols:close-fullscreen" @click="show = false" />
      <p v-for="i, index of contents" :key="index" :class="{ 'text-red active-line': isLyricActive(i.time, i.duration) }" class="text-xl text-[#FFF9D0]  font-bold">
        {{ i.content }}
      </p>
    </div>
  </Transition>
</template>

<style scoped lang='scss'>
.bounce-enter-active {
  animation: bounce-in 0.5s ease-in-out;
}

.bounce-leave-active {
  animation: bounce-in 0.5s ease-in-out reverse;
}

@keyframes bounce-in {
  0% {
    transform: translateY(100%)
  }

  // 50% {
  //   transform: translateY(50%)
  // }
  100% {
    transform: translateY(0%)
  }
}
</style>
