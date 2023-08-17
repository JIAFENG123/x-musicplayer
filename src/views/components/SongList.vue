<script lang='ts' setup>

</script>

<template>
  <section p-4 style="max-height: calc(100vh - 180px);overflow-y: auto;">
    <div v-for="i in 10" :key="i" flex w-full items-center mb-2 p-5 bg="#9570FF1A" rounded-4>
      <img w="12" h="12" src="@/assets/songpic.png" alt="">
      <section flex flex-col ml-5>
        <span color="#000" font="mono" font-size-5 font-700>Ayes ha Ruhin</span>
        <section flex items-center>
          <svg style="width: 20px;height: 20px;" width="16" height="16" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="7" r="6" fill="#9570FF" />
            <path d="M6.18334 5.32653V7.59489C5.93395 7.45163 5.62619 7.39591 5.29987 7.51C4.94436 7.63734 4.67109 7.95306 4.60742 8.32448C4.48538 9.05142 5.10089 9.67224 5.82517 9.55816C6.34517 9.47591 6.71395 8.99836 6.71395 8.4704V5.85714H7.24456C7.5364 5.85714 7.77517 5.61836 7.77517 5.32653C7.77517 5.03469 7.5364 4.79591 7.24456 4.79591H6.71395C6.42211 4.79591 6.18334 5.03469 6.18334 5.32653Z" fill="white" />
          </svg>
          <span color="#828282" font-size-4 ml-1>3:45</span>
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped lang='scss'></style>
