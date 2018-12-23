<template>
  <div>
    <h3>Eye</h3>
    <div id="zone" ref="zone">
      <span class="position">X: {{ position.x }}, Y: {{ position.y }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import nipplejs from 'nipplejs'
import { debounceTime } from 'rxjs/operators'

import { db } from '@/services/firebase'

import Color from '@/components/panels/Color'

export default {
  name: 'LEDStrip',
  components: {
    Color,
  },
  data() {
    return {
      state: '1',
      position: { x: 0, y: 0 },
    }
  },

  created() {
    this.$watchAsObservable('position')
      .pipe(debounceTime(50))
      .subscribe(
        ({ newValue }) => {
          const position = newValue

          db.ref('Eye').update(position)
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
        x: ~~(rx / 2),
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

  width: 100%;
  height: 400px;

  background: #a4c0ff1a;

  .position {
    line-height: 400px;
  }
}
</style>
