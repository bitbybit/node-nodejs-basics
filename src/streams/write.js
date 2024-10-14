import fs from 'node:fs/promises'
import path from 'node:path'

const filePath = `${import.meta.dirname}/files/fileToWrite.txt`
const filePathAbsolute = path.resolve(filePath)

/**
 * @description Writes `process.stdin` data into file `fileToWrite.txt` content using Writable Stream
 * @returns {Promise<void>}
 */
const write = async () => {
  const file = await fs.open(filePathAbsolute, 'w')

  const stream = file.createWriteStream()

  return new Promise((resolve) => {
    process.stdin.on('data', data => {
      stream.write(data)
    })

    process.stdin.on('end', () => {
      stream.end()

      resolve()
    })
  })
}

await write()
