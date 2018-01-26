// Generator functions
import randstr from 'randstr'

function generateComponentKey () {
  return randstr(6)
}

export { generateComponentKey }
