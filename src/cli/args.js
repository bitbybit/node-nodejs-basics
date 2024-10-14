import { formatEntries } from '../helpers/cli.js'

const prefix = '--'
const separatorOfValues = ' is '
const separatorOfItems = ', '

/**
 * @description Parses command line arguments (given in format `--propName value --prop2Name value2`, you don't need to validate it) and prints them to the console in the format `propName is value, prop2Name is value2`
 */
const parseArgs = () => {
  const args = process.argv.slice(2)

  const argsEntries = Object.entries(args.reduce(
    (accumulator, currentValue, currentIndex) => {
      if (currentValue.startsWith(prefix)) {
        const key = currentValue.substring(prefix.length)

        return {
          ...accumulator,
          [key]: args[currentIndex + 1]
        }
      }

      return accumulator
    },
    {},
  ))

  const argsFormatted = formatEntries({
    entries: argsEntries,
    separatorOfItems,
    separatorOfValues
  })

  console.log(argsFormatted)
}

parseArgs()
