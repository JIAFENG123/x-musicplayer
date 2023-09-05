<script lang='ts' setup>
import { Icon } from '@iconify/vue'
import { nextTick, ref, watch } from 'vue'
import emitter from '../eventBus'
import type { SongItem } from '../typet'

const songList = ref<SongItem[]>([])
const show = ref(false)
const paused = ref(true)
const songInfo = ref({
  id: 0,
  title: '',
  img: '',
})
const svg = ref<SVGElement>()
watch(() => show.value, (val) => {
  if (!val)
    return
  nextTick(() => {
    const width = svg.value?.getBoundingClientRect().width as number + 5
    const basePath = document.getElementById('base-path') as unknown as SVGPathElement
    const overlayPath = document.getElementById('overlay-path') as unknown as SVGPathElement
    basePath.setAttribute('d', `M0,45 C100,15 ${width - 100},15 ${width},45`)
    overlayPath.setAttribute('d', `M0,45 C100,15 ${width - 100},15 ${width},45`)
  })
})
const audio = ref(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'))
// 监听进度，修改进度条
audio.value.addEventListener('timeupdate', () => {
  const currentTime = audio.value.currentTime
  const duration = audio.value.duration || Number.POSITIVE_INFINITY
  const percent = currentTime / duration
  const width = svg.value?.getBoundingClientRect().width as number + 5
  const overlayPath = document.getElementById('overlay-path') as unknown as SVGPathElement
  overlayPath.setAttribute('stroke', '#9570FF')
  overlayPath.setAttribute('stroke-dasharray', `${width * percent},${width}`)
})
// 播放完毕，切换下一首
audio.value.addEventListener('ended', () => {
  next()
})
emitter.on('play', (s) => {
  show.value = true
  const song = s as SongItem
  audio.value.src = song.preview
  audio.value.play()
  paused.value = false
  songInfo.value.title = song.title
  songInfo.value.img = song.album.cover_medium
  songInfo.value.id = song.id
})
emitter.on('scrollDirect', (res) => {
  show.value = res !== 'up'
})
emitter.on('songs', (data) => {
  songList.value = data as SongItem[]
  songInfo.value.img = songList.value[0].album.cover_medium
  songInfo.value.title = songList.value[0].title
  songInfo.value.id = songList.value[0].id
})
function play(e: MouseEvent, param?: string) {
  console.log(e)
  paused.value = !paused.value
  param ? audio.value.pause() : audio.value.play()
}
// 切换上一首歌
function pre() {
  if (songList.value.length > 0) {
    const index = songList.value.findIndex((item: SongItem) => item.id === songInfo.value.id)
    if (index > 0) {
      songInfo.value.id = songList.value[index - 1].id
      songInfo.value.title = songList.value[index - 1].title
      songInfo.value.img = songList.value[index - 1].album.cover_medium
      audio.value.src = songList.value[index - 1].preview
      audio.value.play()
    }
  }
}
// 切换下一首歌
function next() {
  if (songList.value.length > 0) {
    const index = songList.value.findIndex((item: SongItem) => item.id === songInfo.value.id)
    if (index < songList.value.length - 1) {
      songInfo.value.id = songList.value[index + 1].id
      songInfo.value.title = songList.value[index + 1].title
      songInfo.value.img = songList.value[index + 1].album.cover_medium
      audio.value.src = songList.value[index + 1].preview
      audio.value.play()
    }
  }
}
</script>

<template>
  <Transition name="bounce">
    <div v-if="show" w-full h="194px" class="bg" rounded-t-26px rounded-b-0px>
      <section p-5 flex pb-0>
        <section flex>
          <img :src="songInfo.img" alt="" w-12 h-12 rounded-2>
          <section flex flex-col ml-3 justify-center>
            <span font-size-4 font-700>{{ songInfo.title }}</span>
          <!-- <span font-size-3 color="#828282">Vanel Ghart</span> -->
          </section>
        </section>
      </section>
      <svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="50px">
        <path id="base-path" stroke-width="2" fill="white" stroke="transparent" d="M0,45 C100,20 300,20 350,45" />
        <path
          id="overlay-path" stroke-linecap="round" stroke-dasharray="10,350" fill="white" stroke="transparent"
          stroke-width="4" d="M0,45 C100,20 300,20 350,45"
        />
      </svg>
      <section bg="white" h="83px">
        <section flex justify-center items-center gap-8>
          <Icon font-size-10 icon="ic:round-skip-previous" @click="pre" />
          <Icon v-if="paused" font-size-12 icon="basil:play-solid" @click="play" />
          <Icon v-else font-size-12 icon="ic:round-pause" @click="play($event, 'pause')" />
          <Icon font-size-10 icon="ic:round-skip-next" @click="next" />
        </section>
      </section>
    </div>
  </Transition>
</template>

<style scoped lang='scss'>
.bg {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px -19px 47px 0px rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(10.5px);
}

svg {
  margin-bottom: -12px;
}
// debance 动画
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
