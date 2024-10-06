import fs from 'node:fs/promises'
import path from 'node:path'

const dirPath = `${import.meta.dirname}/files`
const dirCopyPath = `${import.meta.dirname}/files_copy`
const dirPathAbsolute = path.resolve(dirPath)
const dirCopyPathAbsolute = path.resolve(dirCopyPath)
const messageFailed = 'FS operation failed'

/**
 * @description Try to access `dirCopyPath`
 * @returns {Promise<boolean>}
 * @throws {Error}
 */
const canAccessDirCopy = async () => {
  let canAccess = true

  try {
    await fs.access(dirCopyPathAbsolute)
  } catch (e) {
    if (e?.code === 'ENOENT') {
      canAccess = false
    } else {
      throw e
    }
  }

  return canAccess
}

/**
 * @description Copies folder `files` files with all its content into folder `files_copy` at the same level (if `files` folder doesn't exists or `files_copy` has already been created `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const copy = async () => {
    const dirCopyExists = await canAccessDirCopy()

    if (dirCopyExists) {
      throw new Error(messageFailed)
    }

    try {
      await fs.cp(dirPathAbsolute, dirCopyPathAbsolute, {
        errorOnExist: true,
        force: false,
        recursive: true
      })
    } catch (e) {
      const isMissingDir = e?.code === 'ENOENT'

      if (isMissingDir) {
        throw new Error(messageFailed)
      } else {
        throw e
      }
    }
}

await copy()
