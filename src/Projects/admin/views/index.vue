<template>
  <h3>这是admin首页</h3>
  <img src="@/assets/1.png" alt="">
  <img src="@/assets/2.png" alt="">
  <img src="@/assets/3.jpg" alt="">
  <button @click="back">back</button>
  <button @click="getData">getData</button>
</template>

<script setup>
const back = () => {
  rx.page.back()
}

</script>
<style lang="less" scoped>
img{
  width:300px;
}
</style>
