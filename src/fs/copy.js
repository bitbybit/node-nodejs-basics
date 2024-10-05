import fs from 'node:fs/promises'
import path from 'node:path'

const dirPath = `${import.meta.dirname}/files`
const dirCopyPath = `${import.meta.dirname}/files_copy`
const messageFailed = 'FS operation failed'

/**
 * @description Copies folder `files` files with all its content into folder `files_copy` at the same level (if `files` folder doesn't exists or `files_copy` has already been created `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const copy = async () => {
    try {
      const pathToDirAbsolute = path.resolve(dirPath)
      const pathToDirCopyAbsolute = path.resolve(dirCopyPath)

      await fs.cp(pathToDirAbsolute, pathToDirCopyAbsolute, {
        errorOnExist: true,
        force: false,
        recursive: true
      })
    } catch (e) {
      const isMissingDir = e?.code === 'ENOENT'
      const dirCopyExists = e?.code === 'ERR_FS_CP_EEXIST'

      if (isMissingDir || dirCopyExists) {
        throw new Error(messageFailed)
      } else {
        throw e
      }
    }
}

await copy()
