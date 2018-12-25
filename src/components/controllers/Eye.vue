<template>
  <div>
    <h3>Eye</h3>
    <div id="zone" ref="zone">
      <span class="position">X: {{ position.x }}, Y: {{ position.y }}</span>
    </div>
    <div id="flipX">
      <label for="">Flip X</label>
      <VsSwitch v-model="flipX" color="#26bbae" />
    </div>

    <h3>LED Color</h3>
    <div id="color"><SliderColorPicker v-model="color" /></div>

    <h3>LED State</h3>
    <div id="stateOptions">
      <VsRadio
        v-for="(value, key) in stateOptions"
        :key="key"
        v-model="state"
        :vs-value="value"
      >
        {{ key }}
      </VsRadio>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import nipplejs from 'nipplejs'
import { debounceTime } from 'rxjs/operators'

import { db } from '@/services/firebase'

import { Slider } from 'vue-color'

export default {
  name: 'LEDStrip',
  components: {
    SliderColorPicker: Slider,
  },
  data() {
    return {
      state: '1',
      stateOptions: {
        LIGHT: '1',
        BLINK: '2',
        SMILE: '3',
        SLEEP: '6',
      },
      position: { x: 0, y: 0 },
      flipX: false,
      color: {
        hex: '#18180C',
      },
    }
  },

  created() {
    this.$watchAsObservable('position')
      .pipe(debounceTime(50))
      .subscribe(
        ({ newValue }) => {
          const { x, y } = newValue
          const updatedAt = Date.now()

          db.ref('Eye').update({ x, y, updatedAt })
        },
        err => console.error(err),
        () => console.log('complete')
      )

    this.$watchAsObservable('color')
      .pipe(debounceTime(100))
      .subscribe(
        ({ newValue }) => {
          console.log(newValue)
          const { hex } = newValue
          const color = hex
          const updatedAt = Date.now()

          db.ref('Eye').update({ color, updatedAt })
        },
        err => console.error(err),
        () => console.log('complete')
      )

    this.$watchAsObservable('state')
      .pipe(debounceTime(100))
      .subscribe(
        ({ newValue }) => {
          console.log(newValue)
          const state = newValue
          const updatedAt = Date.now()

          db.ref('Eye').update({ state, updatedAt })
        },
        err => console.error(err),
        () => console.log('complete')
      )
  },
  mounted() {
    console.log(this.$refs)

    this.joystick = nipplejs.create({
      zone: this.$refs.zone,
      mode: 'static',
      position: { left: '50%', top: '200px' },
      color: '#47eb9c',
      size: 200,
    })

    this.joystick.on('move', (evt, data) => {
      // console.log('type', evt.type)
      // console.log('data', data)

      const { distance, angle } = data

      const { radian } = angle
      const rx = Math.cos(radian) * distance
      const ry = Math.sin(radian) * distance
      // console.log({ rx, ry })

      this.position = {
        x: this.flipX ? -~~(rx / 2) : ~~(rx / 2),
        y: ~~(ry / 2),
      }
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 20px;
}

#zone {
  position: relative;
  margin: 10px 0px;

  width: 100%;
  height: 400px;

  background: #a4c0ff1a;

  .position {
    line-height: 400px;
  }
}

#flipX {
  margin-top: -50px;

  > * {
    display: inline-block;
    line-height: 30px;
    vertical-align: middle;
    margin: 0px 5px;
  }
  > button {
    background: #efefef;

    // vuesax bug fix
    /deep/ .vs-switch--input {
      position: relative;
    }
  }
}

#color {
  .vc-slider {
    width: 90%;
    margin: 10px 5%;
  }
}

#stateOptions {
  width: 90%;
  margin: 10px 5%;

  /deep/ {
    .con-vs-radio {
      display: inline-block;
      width: 80px;
    }

    .vs-radio {
      display: inline-block;
      vertical-align: middle;

      &--label {
        font-size: 12px;
      }
    }
  }
}
</style>
