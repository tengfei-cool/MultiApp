<template>
  <h3>这是main首页</h3>
  <ul>
    <li>
      <h4>项目跳转</h4>
      <n-button @click="toPage('/login/')" type="primary" class="test-btn">登录页</n-button>
      <n-button @click="toPage('/admin/')" type="primary" class="test-btn">管理端</n-button>
      <n-button @click="toPage('/admin/', '_blank')" type="primary" class="test-btn">管理端（新窗口）</n-button>
    </li>
    <li>
      <h4>监听事件</h4>
      <n-button @click="trigger" type="primary" class="test-btn">store触发</n-button>
    </li>
    <li>
      <h4>数据存储</h4>
      <n-input v-model:value="title" class="test-input"></n-input>
      <n-button @click="save" type="primary" class="test-btn">保存</n-button>
    </li>
    <li>
      <h4>数据监听</h4>
      <span>main程序count值：{{ count }}</span>
      <n-button @click="countAdd" type="primary" class="test-btn">增加</n-button>
    </li>
    <li>
      <h4>加密解密</h4>
      <n-input v-model:value="inputValue" class="test-input"></n-input>
      <n-button @click="encrypt" type="primary" class="test-btn">加密</n-button>
      <n-button @click="decode" type="primary" class="test-btn">解密</n-button>
      <div>输出值：{{ showValue }}</div>
    </li>
    <li>
      <h4>本地存储</h4>
      <n-input v-model:value="localValue" class="test-input"></n-input>
      <n-button @click="saveLocal" type="primary" class="test-btn">存储</n-button>
      <n-button @click="getLocal" type="primary" class="test-btn">获取</n-button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listener } from '@multiApp'

//页面跳转
const toPage = (path, target) => {
  rx.page.push(path, target)
}
//触发监听事件
const trigger = () => {
  rx.store.token = '222'
}
rx.event.listener('storeEvent', (e) => {
  console.log('store 数据发生变化：')
  console.log(e)
})
//数据存储
const title = ref();
const save = () => {
  rx.store.title = title.value
}
//数据监听
const count = ref(1)
const countAdd = () => {
  count.value++
  rx.store.count = count.value
}
listener("count", (val) => {
  count.value = val
})
//加密解密
const encryptData = ref("")
const decodeData = ref()
const showValue = ref()
const inputValue = ref()
const encrypt = () => {
  encryptData.value = rx.crypto.encrypt(inputValue.value)
  showValue.value = encryptData.value
}
const decode = () => {
  decodeData.value = rx.crypto.decrypt(encryptData.value)
  showValue.value = decodeData.value
}
//本地存贮
const localValue = ref()
const saveLocal = () => {
  rx.storage.set('name', localValue.value)
}
const getLocal = () => {
  localValue.value = rx.storage.get('name')
}


</script>
<style lang="less" scoped>
.test-btn {
  margin: 0 15px;
}

.test-input {
  width: 300px;
  margin-right: 15px;
}
</style>

