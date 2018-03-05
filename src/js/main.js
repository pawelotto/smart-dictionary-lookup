Promise.all([
  browser.storage.local.get("power"),
  browser.storage.local.get("fromLang"),
  browser.storage.local.get("toLang")
]).then(function(vals) {
  if(vals[0].power && vals[1].fromLang && vals[2].toLang){
    document.ondblclick = getTranslation
  }
})

function getTranslation() {
  var selection = document.getSelection()
  if (selection && selection.type === "Range") {
    var textSelected = selection.toString().trim()
    if (textSelected && textSelected.length > 0) {
      Promise.all([
        browser.storage.local.get("fromLang"),
        browser.storage.local.get("toLang")
      ]).then(function(vals) {
        var fromLang = vals[0].fromLang
        var toLang = vals[1].toLang
        console.log(fromLang)
        console.log(toLang)
        if(fromLang && toLang){
          var url = getUrl(textSelected, fromLang, toLang)
          selection.empty()
          openUrl(url).inNewWindow()
        } else {
          alert("Smart Dictionary Lookup: Please select source and target language in settings.")
        }
      })
    }
  }
}

function getUrl(word, from, to) {
  var dictUri = new URL('https://en.pons.com/translate')
  dictUri.searchParams.append("q", word)
  dictUri.searchParams.append("lf", "en")
  if(from === "en" && to === "de"){
    dictUri.searchParams.append("l", to + from)
  } else {
    dictUri.searchParams.append("l", from + to)
  }
  var url = dictUri.toString()
  return url
}

function openUrl(url) {
  return {
    inNewWindow() {
      window.open(url, "_blank")
    }
  }

}