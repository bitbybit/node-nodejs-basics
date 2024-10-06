import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'

const filePath = `${import.meta.dirname}/files/fileToRead.txt`
const filePathAbsolute = path.resolve(filePath)

/**
 * @description Reads file `fileToRead.txt` content using Readable Stream and prints it's content into `process.stdout`
 * @returns {Promise<void>}
 */
const read = async () => {
  const file = await fs.open(filePathAbsolute, 'r')

  const stream = file.createReadStream()

  return new Promise((resolve, reject) => {
    const chunks = []

    stream.on('error', error => reject(error))

    stream.on('data', (chunk) => {
      chunks.push(chunk)
    });

    stream.on('end', () => {
      const content = chunks.join()

      process.stdout.write(`${content}${os.EOL}`)

      resolve()
    })
  })
}

await read()
