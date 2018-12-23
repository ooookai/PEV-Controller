<template>
  <div>
    <h2>Controller {{ controller }}</h2>

    <Component :is="controller"></Component>
  </div>
</template>

<script>
// @ is an alias to /src
import LEDStrip from '@/components/controllers/LEDStrip'

export default {
  name: 'Controller',
  components: {
    LEDStrip,
  },
  data() {
    return {}
  },
  computed: {
    controller() {
      return this.$route.params.controller
    },
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
