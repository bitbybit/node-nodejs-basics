import fs from 'node:fs/promises'
import path from 'node:path'

const filePath = `${import.meta.dirname}/files/fileToRemove.txt`
const filePathAbsolute = path.resolve(filePath)
const messageFileMissing = 'FS operation failed'

/**
 * @description Deletes file `fileToRemove.txt` (if there's no file `fileToRemove.txt` `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const remove = async () => {
  try {
    await fs.rm(filePathAbsolute)
  } catch (e) {
    const isMissingFile = e?.code === 'ENOENT'

    if (isMissingFile) {
      throw new Error(messageFileMissing)
    } else {
      throw e
    }
  }
}

await remove()
