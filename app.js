var noble = require('noble')

/*
function onDiscovery(peripheral) {
  // peripheral.rssi                             - signal strength
  // peripheral.address                          - MAC address
  // peripheral.advertisement.localName          - device's name
  // peripheral.advertisement.manufacturerData   - manufacturer-specific data
  // peripheral.advertisement.serviceData        - normal advertisement service data
  // ignore devices with no manufacturer data
  if (!peripheral.advertisement.manufacturerData) return
  // output what we have
  console.log(
    peripheral.address,
    JSON.stringify(peripheral.advertisement.localName),
    JSON.stringify(peripheral.advertisement.manufacturerData)
  )
}
*/

// List of allowed devices
const devices = ['df:58:1a:f4:56:32']
// last advertising data received
var lastAdvertising = {}

function onDeviceChanged(addr, data) {
  console.log('Device ', addr, 'changed data', JSON.stringify(data))
}

function onDiscovery(peripheral) {
  // do we know this device?
  if (devices.indexOf(peripheral.address) < 0) return
  // does it have manufacturer data with Espruino/Puck.js's UUID
  if (
    !peripheral.advertisement.manufacturerData ||
    peripheral.advertisement.manufacturerData[0] != 0x90 ||
    peripheral.advertisement.manufacturerData[1] != 0x05
  )
    return
  // get just our data
  var data = peripheral.advertisement.manufacturerData.slice(2)
  // check for changed services
  if (lastAdvertising[peripheral.address] != data.toString())
    onDeviceChanged(peripheral.address, data)
  lastAdvertising[peripheral.address] = data
}

noble.on('stateChange', function(state) {
  if (state != 'poweredOn') return
  console.log('Starting scan...')
  noble.startScanning([], true)
})
noble.on('discover', onDiscovery)
noble.on('scanStart', function() {
  console.log('Scanning started.')
})
noble.on('scanStop', function() {
  console.log('Scanning stopped.')
})
