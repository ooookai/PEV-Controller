#!/usr/bin/node

const rosnodejs = require('rosnodejs')
const std_msgs = rosnodejs.require('std_msgs').msg
const ColorRGBA = std_msgs.ColorRGBA

const _ = require('lodash')

const Color = require('color')
let color = Color({ h: 120, s: 20, l: 10 })

rosnodejs.initNode('/color_controller').then(nh => {
  // nh: node handle
  const pub = nh.advertise('/led_strip_color', 'std_msgs/ColorRGBA')

  setInterval(() => {
    const c = color
      .rotate(_.random(360))
      .rgb()
      .object()
    const msg = new ColorRGBA()
    Object.entries(c).map(([key, value]) => (msg[key] = parseInt(value)))

    pub.publish(msg)
  }, 500)
})
