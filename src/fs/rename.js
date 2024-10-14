import fs from 'node:fs/promises'
import path from 'node:path'
import { canAccessPath } from '../helpers/fs.js'

const filePath = `${import.meta.dirname}/files/wrongFilename.txt`
const fileRenamedPath = `${import.meta.dirname}/files/properFilename.md`
const filePathAbsolute = path.resolve(filePath)
const fileRenamedPathAbsolute = path.resolve(fileRenamedPath)
const messageFailed = 'FS operation failed'

/**
 * @description Renames file `wrongFilename.txt` to `properFilename` with extension `.md` (if there's no file `wrongFilename.txt` or `properFilename.md` already exists `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const rename = async () => {
  const fileRenamedExists = await canAccessPath(fileRenamedPathAbsolute)

  if (fileRenamedExists) {
    throw new Error(messageFailed)
  }

  try {
    await fs.rename(filePathAbsolute, fileRenamedPathAbsolute)
  } catch (e) {
    const isMissingFile = e?.code === 'ENOENT'

    if (isMissingFile) {
      throw new Error(messageFailed)
    } else {
      throw e
    }
  }
}

await rename()
