(function() {

  const delayCollection = {}
  const uids = []

  const Util = {}

  Util.delay = function delay(name, timeoff = 0) {
    if (!delayCollection[name]) {
      delayCollection[name] = Date.now()
      return true
    }

    if (delayCollection[name] + timeoff > Date.now()) {
      return false
    }

    delayCollection[name] = Date.now()

    return true
  }

  Util.generateUid = function generateUid(size = 10) {
    let uid = getRandomString(size)

    while (uids.includes(uid)) {
      uid = getRandomString(size)
    }
  }

  const alphabet = "lsakjdlahslldjhahksjdhjwe97239642OLLJLKNHDGFSEXEAHGMBKJBUFRERSVJ!S73974k23jh42k3jh5l2hhk34l2h342k"

  function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  function getRandomString(size = 10) {
    let str = ''

    while (str.length < size) {
      str += getRandomLetter()
    }

    return str
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Util = Util
})()