import fs from 'node:fs/promises'
import path from 'node:path'

const filePath = `${import.meta.dirname}/files/fresh.txt`
const filePathAbsolute = path.resolve(filePath)
const fileContent = 'I am fresh and young'
const messageFileExists = 'FS operation failed'

/**
 * @description Creates new file `fresh.txt` with content `I am fresh and young` inside of the `files` folder (if file already exists `Error` with message `FS operation failed` must be thrown)
 * @returns {Promise<void>}
 * @throws {Error}
 */
const create = async () => {
    try {
      await fs.writeFile(filePathAbsolute, fileContent, { flag: 'wx' })
    } catch (e) {
      const fileExists = e?.code === 'EEXIST'

      if (fileExists) {
        throw new Error(messageFileExists)
      } else {
        throw e
      }
    }
}

await create()
