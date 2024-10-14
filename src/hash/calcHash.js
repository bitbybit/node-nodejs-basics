import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import path from 'node:path'

const filePath = `${import.meta.dirname}/files/fileToCalculateHashFor.txt`
const filePathAbsolute = path.resolve(filePath)
const algorithm = 'sha256'

/**
 * @description Calculates SHA256 hash for file `fileToCalculateHashFor.txt` and logs it into console as `hex` using Streams API
 * @returns {Promise<void>}
 */
const calculateHash = async () => {
  const hash = crypto.createHash(algorithm)

  hash.setEncoding('hex')

  const file = await fs.open(filePathAbsolute, 'r')

  const stream = file.createReadStream()

  stream.pipe(hash)

  return new Promise((resolve, reject) => {
    stream.on('error', error => reject(error))

    stream.on('end', () => {
      hash.end()

      const result = hash.read()

      console.log(result)

      resolve()
    })
  })
}

await calculateHash()
