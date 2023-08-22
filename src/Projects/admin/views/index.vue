<template>
  <h3>这是首页</h3>
  <button @click="toPage">main</button>
</template>

<script setup>
import rx from '@/multiApp'
const toPage = () => {
  rx.page('/main',)
}
</script>

