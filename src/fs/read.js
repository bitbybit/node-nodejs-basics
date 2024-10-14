import fs from 'node:fs/promises'
import path from 'node:path'

const filePath = `${import.meta.dirname}/files/fileToRead.txt`
const filePathAbsolute = path.resolve(filePath)
const messageFileMissing = 'FS operation failed'

/**
 * @description Prints content of the `fileToRead.txt` into console (if there's no file `fileToRead.txt` `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const read = async () => {
  try {
    const content = await fs.readFile(filePathAbsolute, { encoding: 'utf8' })

    console.log(content)
  } catch (e) {
    const isMissingFile = e?.code === 'ENOENT'

    if (isMissingFile) {
      throw new Error(messageFileMissing)
    } else {
      throw e
    }
  }
}

await read()
