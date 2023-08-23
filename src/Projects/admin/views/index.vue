<template>
  <h3>这是首页</h3>
  <button @click="back">back</button>
  <button @click="getData">getData</button>
</template>

<script setup>
const back = () => {
  rx.page.back()
}
const getData = () => {
  console.log(rx.store.data)
}
</script>

