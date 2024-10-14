import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

const filePath = `${import.meta.dirname}/files/fileToCompress.txt`
const fileArchivePath = `${import.meta.dirname}/files/archive.gz`
const filePathAbsolute = path.resolve(filePath)
const fileArchivePathAbsolute = path.resolve(fileArchivePath)

/**
 * @description Decompresses `archive.gz` back to the `fileToCompress.txt` with same content as before compression using `zlib` and Streams API
 * @returns {Promise<void>}
 */
const decompress = async () => {
  const file = await fs.open(filePathAbsolute, 'w')
  const archive = await fs.open(fileArchivePathAbsolute, 'r')

  const stream = file.createWriteStream()
  const streamArchive = archive.createReadStream()

  const unArchiveFile = zlib.createGunzip()

  streamArchive.pipe(unArchiveFile).pipe(stream)
}

await decompress()
