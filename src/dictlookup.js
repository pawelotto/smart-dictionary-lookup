document.ondblclick = getSelection

function getSelection() {
  var selection = document.getSelection()
  if (selection && selection.type === "Range") {
    var textSelected = selection.toString().trim()
    if (textSelected && textSelected.length > 0) {
      selection.empty()
      var url = getUrl(textSelected)
      getTranslation(url).inNewWindow()
    }
  }
}

function getUrl(word) {
  var dictUri = new URL('https://en.pons.com/translate')
  dictUri.searchParams.append("q", word)
  dictUri.searchParams.append("lf", "en")
  dictUri.searchParams.append("l", "enpl")
  var url = dictUri.toString()
  return url
}

function getTranslation(url) {
  return { 
    inNewWindow(){
      window.open(url, "_blank")
    }
  }
}