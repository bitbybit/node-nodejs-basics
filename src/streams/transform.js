import stream from 'node:stream'
import os from 'node:os'

/**
 * @description Reads data from `process.stdin`, reverses text using Transform Stream and then writes it into `process.stdout`
 * @returns {Promise<void>}
 */
const transform = async () => {
  const reverseInput = new stream.Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('')

      callback(null, `${reversed}${os.EOL}`);
    }
  })

  process.stdin.pipe(reverseInput).pipe(process.stdout)
}

await transform()
