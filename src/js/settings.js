document.addEventListener("DOMContentLoaded", function() {
  readSettings()
  var powerSwitch = document.getElementById("powerSwitch")
  var fromInput = document.getElementById("fromLang")
  var toInput = document.getElementById("toLang")
  powerSwitch.onclick = togglePower
  fromInput.onchange = saveSettings
  toInput.onchange = saveSettings
})

function saveSettings() {
  var from = document.getElementById("fromLang").value || ""
  var to = document.getElementById("toLang").value || ""
  browser.storage.local.set({ fromLang: from })
  browser.storage.local.set({ toLang: to })
  browser.tabs.reload()
}

function readSettings() {
  browser.storage.local.get("fromLang", function(val) {
    if(val.fromLang){
      document.getElementById("fromLang").value = val.fromLang
    }
  })
  browser.storage.local.get("toLang", function(val) {
    if(val.toLang){
      document.getElementById("toLang").value = val.toLang
    }
  })
  browser.storage.local.get("power").then(function(val) {
    var powerText = document.getElementById("powerText")
    var powerSwitch = document.getElementById("powerSwitch")
    var powerTitle = "Dictionary is turned "
    if (val.power) {
      powerTitle += "on"
      powerSwitch.style.opacity = "1"
    } else {
      powerTitle += "off"
      powerSwitch.style.opacity = "0.4"
    }
    powerText.innerText = powerTitle
  })
}

function togglePower() {
  var powerText = document.getElementById("powerText")
  var powerSwitch = document.getElementById("powerSwitch")
  var powerTitle = "Dictionary is turned "
  browser.storage.local.get("power").then(function(val) {
    if (!val.power) {
      powerTitle += "on"
      powerSwitch.style.opacity = "1"
      browser.storage.local.set({ power: true })
      browser.tabs.reload()
    } else {
      powerTitle += "off"
      powerSwitch.style.opacity = "0.4"
      browser.storage.local.set({ power: false })
      browser.tabs.reload()
    }
    powerText.innerText = powerTitle
  })
}