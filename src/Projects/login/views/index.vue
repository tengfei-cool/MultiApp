<template>
  <h3>这是login首页</h3>
  <n-button @click="back">返回主程序</n-button>
</template>

<script setup>
const back = () => {
  rx.page.back()
}
</script>
