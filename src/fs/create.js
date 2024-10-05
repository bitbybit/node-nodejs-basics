import fs from 'node:fs/promises'
import path from 'node:path'
import { constants } from 'node:os'

const filePath = `${import.meta.dirname}/files/fresh.txt`
const fileContent = 'I am fresh and young'
const messageFileExists = 'FS operation failed'

/**
 * @description Creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder (if file already exists `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const create = async () => {
    try {
      const pathToFileAbsolute = path.resolve(filePath)

      await fs.writeFile(pathToFileAbsolute, fileContent, { flag: 'wx' })
    } catch (e) {
      const fileExists = e?.errno === -constants.errno.EEXIST

      if (fileExists) {
        throw new Error(messageFileExists)
      } else {
        throw e
      }
    }
}

await create()
