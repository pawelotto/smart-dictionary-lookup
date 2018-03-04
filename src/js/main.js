browser.storage.local.get("power").then(function(val) {
  if(val.power){
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
        var url = getUrl(textSelected, fromLang, toLang)
        selection.empty()
        openUrl(url).inNewWindow()
      })
    }
  }
}

function getUrl(word, from, to) {
  var dictUri = new URL('https://en.pons.com/translate')
  dictUri.searchParams.append("q", word)
  dictUri.searchParams.append("lf", "en")
  dictUri.searchParams.append("l", from + to)
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
