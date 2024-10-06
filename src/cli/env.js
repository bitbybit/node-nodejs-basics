const prefix = 'RSS_'
const separatorOfValues = '='
const separatorOfItems = '; '

/**
 * @description Parses environment variables with prefix `RSS_` and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`
 */
const parseEnv = () => {
  const envs = Object.entries(process.env)

  const envsFiltered = envs.filter(([key]) => key.startsWith(prefix))

  const envsMapped = envsFiltered.map(
    ([key, value]) => `${key}${separatorOfValues}${value}`
  )

  const envsFormatted = envsMapped.join(separatorOfItems)

  console.log(envsFormatted)
}

parseEnv()
