<template>
  <ChromeColorPicker v-model="colors" />
</template>

<script>
import { Chrome } from 'vue-color'

import { debounceTime } from 'rxjs/operators'

import { db } from '@/services/firebase'

export default {
  name: 'PanelColor',
  components: {
    ChromeColorPicker: Chrome,
  },
  props: {
    remoteKey: {
      type: String,
      default: 'remoteKey',
    },
  },
  data() {
    return {
      colors: {
        hex: '#194d33',
      },
    }
  },
  created() {
    this.$watchAsObservable('colors')
      .pipe(debounceTime(100))
      .subscribe(
        ({ newValue }) => {
          const { rgba } = newValue

          db.ref('color').set(rgba)
        },
        err => console.error(err),
        () => console.log('complete')
      )
  },
}
</script>

<style lang="scss" scoped>
.vc-chrome {
  width: 100%;
}
</style>
