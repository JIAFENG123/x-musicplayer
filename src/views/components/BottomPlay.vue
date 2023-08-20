<script lang='ts' setup>
import { onMounted, ref } from 'vue'

const svg = ref<SVGElement>()
onMounted(() => {
  const width = svg.value?.getBoundingClientRect().width as number
  const basePath = document.getElementById('base-path') as unknown as SVGPathElement
  const overlayPath = document.getElementById('overlay-path') as unknown as SVGPathElement
  basePath.setAttribute('d', `M0,45 C100,15 ${width - 100},15 ${width},45`)
  overlayPath.setAttribute('d', `M0,45 C100,15 ${width - 100},15 ${width},45`)
  overlayPath.setAttribute('stroke-dasharray', `100,${width}`)
  console.log('---', width)
})
</script>

<template>
  <div w-full h="194px" class="bg" rounded-t-26px rounded-b-0px>
    <section p-5 flex pb-0>
      <section flex>
        <img src="@/assets/jianjie.png" alt="">
        <section flex flex-col ml-3 justify-center>
          <span font-size-4 font-700>Amused City</span>
          <span font-size-3 color="#828282">Vanel Ghart</span>
        </section>
      </section>
    </section>
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="50px">
      <path id="base-path" stroke-width="2" fill="white" stroke="transparent" d="M0,30 C100,20 300,20 350,30" />
      <path
        id="overlay-path"
        stroke-linecap="round" stroke-dasharray="100,350" fill="white" stroke="#9570FF" stroke-width="4"
        d="M0,30 C100,20 300,20 350,30"
      />
    </svg>
    <section bg="white" h="83px" />
  </div>
</template>

<style scoped lang='scss'>
.bg {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px -19px 47px 0px rgba(0, 0, 0, 0.19);
    backdrop-filter: blur(10.5px);
}
svg{
    margin-bottom: -11px;
}
</style>
