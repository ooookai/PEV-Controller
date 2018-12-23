#!/usr/bin/node

const rosnodejs = require('rosnodejs')
const std_msgs = rosnodejs.require('std_msgs').msg
const geometry_msgs = rosnodejs.require('geometry_msgs').msg

// const _ = require('lodash')

const admin = require('firebase-admin')

const rxfireDB = require('rxfire/database')
const {
  map,
  groupBy,
  distinctUntilKeyChanged,
  flatMap,
  mergeMap,
} = require('rxjs/operators')

const serviceAccount = require('../../pev-controller-firebase-adminsdk-key.json')

const FirebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pev-controller.firebaseio.com',
})

const db = FirebaseApp.database()

rosnodejs.initNode('/controller').then(nh => {
  // nh: node handle

  const pub = {
    led_strip_color: nh.advertise('/led_strip_color', std_msgs.ColorRGBA),
    led_strip_state: nh.advertise('/led_strip_state', std_msgs.String),
    eye_position: nh.advertise('/eye_position', geometry_msgs.Point),
  }

  const publisher = {
    LEDStrip: ({ r, g, b, state }) => {
      const c = new std_msgs.ColorRGBA()
      c.r = parseInt(r)
      c.g = parseInt(g)
      c.b = parseInt(b)
      pub.led_strip_color.publish(c)

      const s = new std_msgs.String({ data: `${state}` })
      pub.led_strip_state.publish(s)
    },
    Eye: ({ x, y }) => {
      const p = new geometry_msgs.Point()
      p.x = parseInt(x)
      p.y = parseInt(y)
      p.z = 0
      pub.eye_position.publish(p)
    },
  }

  /* Test
  const Color = require('color')
  let color = Color({ h: 120, s: 20, l: 10 })
  setInterval(() => { 
    const c = color
      .rotate(_.random(360))
      .rgb()
      .object()

    publisher.color(c)
  }, 500)
  */

  // ====== RxJS ====== //

  rxfireDB
    .list(db.ref())
    .pipe(
      map(changes =>
        changes.map(cm => ({
          key: cm.snapshot.key,
          value: cm.snapshot.val(),
        }))
      ),
      flatMap(m => m),
      groupBy(gb => gb.key),
      mergeMap(mm => mm.pipe(distinctUntilKeyChanged('value')))
    )
    .subscribe(control => {
      console.log(control)
      if (publisher[control.key]) publisher[control.key](control.value)
    })
})
