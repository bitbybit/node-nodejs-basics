import fs from 'node:fs/promises'
import path from 'node:path'

const dirPath = `${import.meta.dirname}/files`
const dirPathAbsolute = path.resolve(dirPath)
const messageDirMissing = 'FS operation failed'

/**
 * @description Prints all array of filenames from `files` folder into console (if `files` folder doesn't exists `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const list = async () => {
  try {
    const files = await fs.readdir(dirPathAbsolute)

    for (const file of files) {
      console.log(file)
    }
  } catch (e) {
    const isMissingDir = e?.code === 'ENOENT'

    if (isMissingDir) {
      throw new Error(messageDirMissing)
    } else {
      throw e
    }
  }
}

await list()
