import { formatEntries } from '../helpers/cli.js'

const prefix = 'RSS_'
const separatorOfValues = '='
const separatorOfItems = '; '

/**
 * @description Parses environment variables with prefix `RSS_` and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`
 */
const parseEnv = () => {
  const envs = Object.entries(process.env)

  const envsFiltered = envs.filter(([key]) => key.startsWith(prefix))

  const envsFormatted = formatEntries({
    entries: envsFiltered,
    separatorOfItems,
    separatorOfValues
  })

  console.log(envsFormatted)
}

parseEnv()
