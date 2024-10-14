import { parentPort } from 'node:worker_threads'

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2)

/**
 * @description Work with data received from main thread and implement function which sends result of the computation to the main thread
 */
const sendResult = () => {
  parentPort.on('message',  number => {
    parentPort.postMessage({
      result: nthFibonacci(number)
    })
  })
}

sendResult()
