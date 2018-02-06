// Miscellaneous utilities
import randstr from 'randstr'

function generateComponentKey () {
  return randstr(8)
}

function removeLocalStorageItems (keys) {
  keys.forEach(key => {
    localStorage.removeItem(key)
  })
}

function isOlderThan24Hours (time) {
  let oneDay = (60 * 60 * 1000) * 24
  if ((Date.now() - time) > oneDay) return true
  else return false
}

export { generateComponentKey, removeLocalStorageItems, isOlderThan24Hours }
