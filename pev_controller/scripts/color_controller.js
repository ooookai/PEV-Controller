#!/usr/bin/node

const rosnodejs = require('rosnodejs')
const std_msgs = rosnodejs.require('std_msgs').msg
const ColorRGBA = std_msgs.ColorRGBA

const _ = require('lodash')

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

const Color = require('color')
let color = Color({ h: 120, s: 20, l: 10 })

rosnodejs.initNode('/color_controller').then(nh => {
  // nh: node handle

  const pub = {
    color: nh.advertise('/led_strip_color', 'std_msgs/ColorRGBA'),
  }

  const publisher = {
    color: ({ r, g, b }) => {
      const msg = new ColorRGBA()

      msg.r = parseInt(r)
      msg.g = parseInt(g)
      msg.b = parseInt(b)
      pub.color.publish(msg)
    },
  }

  /* Test
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
      publisher[control.key](control.value)
    })
})
