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

export { generateComponentKey, removeLocalStorageItems }
