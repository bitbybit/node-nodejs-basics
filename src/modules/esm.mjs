import fs from 'node:fs/promises'
import path from 'node:path'
import { release, version } from 'node:os'
import { createServer as createServerHttp } from 'node:http'
import './files/c.js'

/**
 * @description Reads and parses JSON from filesystem
 * @param {string} pathToFile
 * @returns {Promise<void>}
 * @throws {Error}
 */
const readJSON = async (pathToFile) => {
  const content = await fs.readFile(path.resolve(pathToFile), { encoding: 'utf8' })

  return JSON.parse(content);
}

const random = Math.random()

let unknownObject

if (random > 0.5) {
  unknownObject = await readJSON(`${import.meta.dirname}/files/a.json`)
} else {
  unknownObject = await readJSON(`${import.meta.dirname}/files/b.json`)
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export {
  unknownObject,
  myServer
}
