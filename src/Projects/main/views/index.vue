<template>
  <h3>这是首页</h3>
  <button @click="test">ddd </button>
  <button @click="setValue">setValue</button>
  <button @click="setStore">setStore</button>
  <button @click="getStore">getStore</button>
  <button @click="clearStore">clear</button>
  <button @click="getData">getData</button>
  <button @click="setData">setData</button>
  <button @click="clearAll">clearAll</button>
</template>

<script setup>

const test = () => {
  rx.page.push('/admin/')
}
const setStore = () => {
  rx.store.token = 'RX shadriw3rsdawe98rsadnf98qwyernsi8yr97werasir8qw98ehsx98rqw9eshd8rwq9ehxdo8rqw09e8rhxs'
  rx.store.userInfo = {
    userName:'tengfei',
    depart:'研发部'
  }
}
const setValue = () => {
  rx.store.data = 'data-set'
}
const getStore = () => {
  console.log(rx.store.data,'data')
  console.log(rx.store.token,'token')
  console.log(rx.store.userInfo,'userInfo')
}
const clearStore = () => {
  rx.store.clear('name')
}
const getData = () => {
  let data = rx.store.data
  console.log(data)
}
const setData = () => {
  rx.store.setData('name','tengfei2')
}
const clearAll = () => {
  rx.store.clearAll()
}
</script>

