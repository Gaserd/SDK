const RANGE_SIZE = 200000

const makeBlockRanges = (fromBlock: number, latestBlock: number, rangeSize: number = RANGE_SIZE) => {
  const ranges: [number, number][] = []

  for (let startBlock = fromBlock; startBlock < latestBlock; startBlock += rangeSize) {
    startBlock === fromBlock ? startBlock : startBlock++
    const endBlock = startBlock + rangeSize > latestBlock ? latestBlock : startBlock + rangeSize

    ranges.push([ startBlock, endBlock ])
  }

  return ranges
}

export default makeBlockRanges
