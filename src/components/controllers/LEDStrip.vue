<template>
  <div>
    <h3>Color</h3>
    <div class="color"><Color remote-key="LEDStrip" /></div>
    <h3>State</h3>
    <div class="state">
      <VsSelect v-model="state" label="state">
        <VsSelectItem color="#FB559B" :value="1" text="Light"></VsSelectItem>
        <VsSelectItem color="#FBC055" :value="2" text="Blink"></VsSelectItem>
        <VsSelectItem color="#6655FB" :value="3" text="Breath"></VsSelectItem>
        <VsSelectItem color="#55FBBB" :value="4" text="Wink"></VsSelectItem>
      </VsSelect>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Color from '@/components/panels/Color'

import { db } from '@/services/firebase'

export default {
  name: 'LEDStrip',
  components: {
    Color,
  },
  data() {
    return {
      state: '1',
    }
  },

  created() {
    this.$watchAsObservable('state').subscribe(
      ({ newValue }) => {
        const state = newValue
        const updatedAt = Date.now()

        db.ref('LEDStrip').update({ state, updatedAt })
      },
      err => console.error(err),
      () => console.log('complete')
    )
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 20px;
}

.color {
  width: 86%;
  margin-left: 7%;
}

.state {
  text-align: left;
  width: 86%;
  margin-left: 7%;
}
</style>
