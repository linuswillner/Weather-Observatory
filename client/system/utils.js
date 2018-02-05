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

function isOlderThan24Hours (storedTime, newTime) {
  if (Math.abs(storedTime - newTime) / 360000 === 24) return true
  else return false
}

export { generateComponentKey, removeLocalStorageItems, isOlderThan24Hours }
