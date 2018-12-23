<template>
  <div>
    <h1>Controllers</h1>
    <div
      v-for="(controller, key) in controllers"
      :key="key"
      class="controller"
      @click="routerGo(`control/${controller}`)"
    >
      <span>{{ controller }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      controllers: ['LEDStrip'],
    }
  },
  methods: {
    routerGo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss" scoped>
.controller {
  $r: 120px;
  display: inline-block;
  width: $r;
  height: $r;
  margin: 30px;
  border: gray solid 2px;
  border-radius: 10px;
  box-shadow: #00000073 1px 1px 5px;
  span {
    line-height: $r;
  }
}
</style>
