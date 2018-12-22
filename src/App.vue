<template>
  <div id="app">
    <div id="colorTest"><Color /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Color from '@/components/panels/Color'

export default {
  name: 'App',
  components: {
    Color,
  },
  data() {
    return {}
  },

  created() {},
  methods: {},
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #44538c;
  user-select: none;
}

#app {
  text-align: center;
}
</style>

<style lang="scss" scoped>
#colorTest {
  margin: 50px;
  max-width: 80%;
  max-height: 50%;
}
</style>
