<template>
  <div>
    <ChromeColorPicker v-model="color" />
    <CompactColorPicker v-model="color" />
    <SliderColorPicker v-model="color" />
  </div>
</template>

<script>
import { Chrome, Compact, Slider } from 'vue-color'

import { debounceTime } from 'rxjs/operators'

import { db } from '@/services/firebase'

export default {
  name: 'PanelColor',
  components: {
    ChromeColorPicker: Chrome,
    CompactColorPicker: Compact,
    SliderColorPicker: Slider,
  },
  props: {
    remoteKey: {
      type: String,
      default: 'remoteKey',
    },
  },
  data() {
    return {
      color: {
        hex: '#194d33',
      },
    }
  },
  created() {
    this.$watchAsObservable('color')
      .pipe(debounceTime(100))
      .subscribe(
        ({ newValue }) => {
          const { rgba } = newValue

          db.ref(this.remoteKey).update(rgba)
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

  /deep/ {
    .vc-chrome-controls {
      display: none;
    }
    .vc-chrome-fields-wrap {
      padding: 0px;
    }
  }
}

.vc-compact {
  width: 100%;
  text-align: center;
  margin: 10px 0px;

  /deep/ {
    .vc-compact-colors {
      display: inline-block;
      max-width: 245px;
      margin: 5px;
    }
  }
}

.vc-slider {
  width: 100%;
  margin: 10px 0px;
}
</style>
