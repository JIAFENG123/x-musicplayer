<script lang='ts' setup>
import { nextTick, ref } from 'vue'
import type { SongItem } from '../typet'
import emitter from '../eventBus'

const query = ref('eminem')
const songRef = ref<HTMLElement>()
nextTick(() => {
  let lastScrollTop = songRef.value?.scrollTop || 0
  songRef.value?.addEventListener('scroll', () => {
    const scrollTop = songRef.value?.scrollTop || 0
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up'
    lastScrollTop = scrollTop
    emitter.emit('scrollDirect', scrollDirection)
  })
})

const songList = ref<SongItem[]>([])
function getJsonUrl() {
  // https://gist.githubusercontent.com/JIAFENG123/517a7c8befd92caf9eb9694d780bb290/raw/b2dfe5f25b1dffa85919184ac67ee10e244c0259/json
  return fetch(
    'https://api.github.com/gists/517a7c8befd92caf9eb9694d780bb290',
    {
      headers: {
        Authorization: '',
        Accept: 'application/vnd.github+json',
      },
    },
  )
    .then(res => res.json())
    .then((res) => {
      return res.files.json.raw_url
    })
}
function getDataList() {
  return getJsonUrl().then((url) => {
    return fetch(url)
      .then(res => res.json())
      .then((res) => {
        return res.list
      })
  })
}
function formatTime(duration: number) {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
async function fetchData() {
  const headers = new Headers()
  headers.append('X-RapidAPI-Key', '6cfd8e0d69msh815d1ce33eb826ap13c99fjsn97c1ea1b663c')
  headers.append('X-RapidAPI-Host', 'deezerdevs-deezer.p.rapidapi.com')
  // const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query.value}`, {
  //   method: 'GET',
  //   headers,
  // })
  const res = await getDataList()
  console.log('----', res)
  sessionStorage.setItem('songList', JSON.stringify(res))
  const jsonData = res.map((item: any) => {
    return {
      id: item.id,
      title: `${item.name}-${item.album?.name}` || '',
      album: {
        cover_medium: item.songInfo.picUrl,
      },
      preview: item.songInfo[320],
      time: formatTime(item.songInfo?.duration),
    }
  })
  // const json = await res.json()
  songList.value = jsonData
  emitter.emit('songs', songList.value)
}
emitter.on('search', (val) => {
  query.value = val as string
  fetchData()
})
function checkSong(i: SongItem) {
  emitter.emit('play', i)
}
fetchData()
</script>

<template>
  <section ref="songRef" p-4 style="max-height: calc(100vh - 180px);overflow-y: auto;">
    <div v-for="i in songList" :key="i.id" flex w-full items-center mb-2 p-3 bg="#9570FF1A" rounded-4 @click="checkSong(i)">
      <img w="11" h="11" rounded="1/2" :src="i.album.cover_medium" alt="">
      <section flex flex-col ml-5>
        <span color="#000" font="mono" font-size-4 font-700>{{ i .title }}</span>
        <section flex items-center>
          <svg
            style="width: 20px;height: 20px;" width="16" height="16" viewBox="0 0 13 14" fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="7" r="6" fill="#9570FF" />
            <path
              d="M6.18334 5.32653V7.59489C5.93395 7.45163 5.62619 7.39591 5.29987 7.51C4.94436 7.63734 4.67109 7.95306 4.60742 8.32448C4.48538 9.05142 5.10089 9.67224 5.82517 9.55816C6.34517 9.47591 6.71395 8.99836 6.71395 8.4704V5.85714H7.24456C7.5364 5.85714 7.77517 5.61836 7.77517 5.32653C7.77517 5.03469 7.5364 4.79591 7.24456 4.79591H6.71395C6.42211 4.79591 6.18334 5.03469 6.18334 5.32653Z"
              fill="white"
            />
          </svg>
          <span color="#828282" font-size-3 ml-1>{{ i.time }}</span>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped lang='scss'></style>
