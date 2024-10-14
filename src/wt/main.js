import os from 'node:os'
import { Worker } from 'node:worker_threads'
import path from 'node:path'

const workerPath = `${import.meta.dirname}/worker.js`
const workerPathAbsolute = path.resolve(workerPath)
const numberInitial = 10
const numberOfThreads = os.cpus().length

/**
 * @description Creates number of worker threads (equal to the number of host machine logical CPU cores) from file `worker.js` and able to send data to those threads and to receive result of the computation from them. You should send incremental number starting from `10` to each `worker`. For example: on host machine with **4** cores you should create **4** workers and send **10** to first `worker`, **11** to second `worker`, **12** to third `worker`, **13** to fourth `worker`. After all workers will finish, function should log array of results into console. The results are array of objects with 2 properties:
 *  - `status` - `'resolved'` in case of successfully received value from `worker` or `'error'` in case of error in `worker`
 *  - `data` - value from `worker` in case of success or `null` in case of error in worker
 * @returns {Promise<void>}
 */
const performCalculations = async () => {
  let number = numberInitial

  const workers = []
  const results = []

  for (let index = 0; index < numberOfThreads; index++) {
    workers[index] = new Worker(workerPathAbsolute)

    results[index] = {
      status: 'error',
      data: null
    }

    workers[index].postMessage(number)

    number++
  }

  /**
   * @description Send and receive results from workers
   * @param {Object} payload
   * @param {(reason?: any) => void} payload.reject
   * @param {(value?: any) => void} payload.resolve
   * @param {Worker} payload.worker
   * @param {number} payload.workerIndex
   */
  const executor = ({
    reject,
    resolve,
    worker,
    workerIndex
  }) => {
    worker.on('message', data => {
      results[workerIndex] = {
        status: 'resolved',
        data: data.result
      }

      resolve()
    })

    worker.on('error', () => reject(workerIndex))

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(workerIndex)
      }
    })
  }

  await Promise.all(
    workers.map((worker, index) => new Promise(
      (resolve, reject) => executor({
        reject,
        resolve,
        worker,
        workerIndex: index
      })
    ).catch((e) => {
      if (e instanceof Error) {
        throw e
      }
    }))
  )

  console.log(results)
}

await performCalculations()
