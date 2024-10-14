import path from 'node:path'
import { spawn } from 'node:child_process'

const filePath = `${import.meta.dirname}/files/script.js`
const filePathAbsolute = path.resolve(filePath)

/**
 * @description Receives array of arguments `args` and creates child process from file `script.js`, passing these `args` to it. This function should create IPC-channel between `stdin` and `stdout` of master process and child process:
 *  - child process `stdin` should receive input from master process `stdin`
 *  - child process `stdout` should send data to master process `stdout`
 * @param {any[]?} args
 * @returns {Promise<void>}
 */
const spawnChildProcess = async (args) => {
  spawn('node', [filePathAbsolute, ...args], {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
}

// Put your arguments in function call to test this functionality
spawnChildProcess(['someArgument1', 'someArgument2'])

