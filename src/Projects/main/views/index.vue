<template>
  <h3>这是main首页</h3>
  <img src="@/assets/1.png" alt="">
  <img src="@/assets/2.png" alt="">
  <img src="@/assets/3.jpg" alt="">
  test----------------main
  <button @click="toAdmin">admin</button>

</template>

<script setup>
const toAdmin = () => {
  rx.page.push('/admin/')
}
</script>
<style lang="less" scoped>
  img{
    width:200px;
  }
</style>
