// Generator functions
import randstr from 'randstr'

function generateComponentKey () {
  return randstr(8)
}

export { generateComponentKey }
