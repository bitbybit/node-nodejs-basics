import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'

const filePath = `${import.meta.dirname}/files/fileToCompress.txt`
const fileArchivePath = `${import.meta.dirname}/files/archive.gz`
const filePathAbsolute = path.resolve(filePath)
const fileArchivePathAbsolute = path.resolve(fileArchivePath)

/**
 * @description Compresses file `fileToCompress.txt` to `archive.gz` using `zlib` and Streams API
 * @returns {Promise<void>}
 */
const compress = async () => {
  const file = await fs.open(filePathAbsolute, 'r')
  const archive = await fs.open(fileArchivePathAbsolute, 'w')

  const stream = file.createReadStream()
  const streamArchive = archive.createWriteStream()

  const archiveFile = zlib.createGzip()

  stream.pipe(archiveFile).pipe(streamArchive)
}

await compress()
