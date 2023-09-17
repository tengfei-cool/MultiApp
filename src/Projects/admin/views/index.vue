<template>
  <h3>这是admin首页</h3>
  <ul>
    <li>  
      <n-button type="primary" @click="back">返回主程序</n-button>
    </li>
    <li>
      <n-button type="primary" @click="getStore">获取store数据</n-button>
    </li>
    <li>
      admin项目count值：{{count}} <n-button type="primary" @click="decrease">减值</n-button>
    </li>
  </ul>

</template>

<script setup>
 import {ref} from 'vue'
 import {listener} from '@multiApp'


const back = () => {
  rx.page.back()
}
const getStore = () => {
  console.log(rx.store.data)
}


 //监听store中count的变化
 const count = ref(1)
 listener("count",(val)=>{
  count.value = val
 })
const decrease = () => {
  count.value --
  rx.store.count = count.value
}
</script>
<style lang="less" scoped>
li{
  margin-bottom:15px;
}
</style>
