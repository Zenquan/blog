<template>
  <!-- 修改应用组件的模板 -->
  <div id="app">
    {{count}}
    <comp01></comp01>
    <comp02></comp02>
  </div>
</template>

<script>
// 引入底部组件并注册
import comp01 from "./components/comp01";
import comp02 from "./components/comp02";
export default {
  components: {
    comp01,
    comp02
  }
};
</script>

<style>
</style>
