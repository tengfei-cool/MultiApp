<template>
  <h3>这是首页</h3>
  <button @click='toPage'>admin 5</button>
</template>

<script setup>
import rx from '@/multiApp'
const toPage = () => {
  rx.page({
    name:'admin',
    path:'/'
  })
}
</script>

