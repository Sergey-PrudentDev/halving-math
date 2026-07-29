'use strict';

const BLOCKS_PER_ERA = 210000;
const GENESIS_REWARD = 50;
const MAX_ERAS = 33; // reward rounds to 0 satoshis after era 33
const SATS_PER_BTC = 100000000;

/** 1-indexed halving era for a given block height. */
function eraForBlock(height) {
  if (!Number.isFinite(height) || height < 0) throw new RangeError('height must be a non-negative number');
  return Math.floor(height / BLOCKS_PER_ERA) + 1;
}

/** Block subsidy (in BTC) paid during a given era. 0 once issuance has ended (era > 33). */
function rewardForEra(era) {
  if (!Number.isInteger(era) || era < 1) throw new RangeError('era must be a positive integer');
  if (era > MAX_ERAS) return 0;
  return GENESIS_REWARD / Math.pow(2, era - 1);
}

/** Block subsidy (in BTC) at a given block height. */
function rewardAtBlock(height) {
  return rewardForEra(eraForBlock(height));
}

/** How many blocks into its era a given height is (0-indexed). */
function blocksIntoEra(height) {
  if (!Number.isFinite(height) || height < 0) throw new RangeError('height must be a non-negative number');
  return height % BLOCKS_PER_ERA;
}

/** Blocks remaining until the next halving, from a given height. */
function blocksUntilNextHalving(height) {
  return BLOCKS_PER_ERA - blocksIntoEra(height);
}

/** The block height at which the next halving after `height` occurs. */
function nextHalvingBlock(height) {
  return height + blocksUntilNextHalving(height);
}

/** Approximate total BTC issued by (and including) a given block height. */
function totalIssuedByBlock(height) {
  if (!Number.isFinite(height) || height < 0) throw new RangeError('height must be a non-negative number');
  const era = eraForBlock(height);
  let total = 0;
  for (let e = 1; e < era; e++) {
    total += rewardForEra(e) * BLOCKS_PER_ERA;
  }
  total += rewardForEra(era) * blocksIntoEra(height);
  return total;
}

function btcToSats(btc) {
  return Math.round(btc * SATS_PER_BTC);
}

function satsToBtc(sats) {
  return sats / SATS_PER_BTC;
}

module.exports = {
  BLOCKS_PER_ERA,
  GENESIS_REWARD,
  MAX_ERAS,
  SATS_PER_BTC,
  eraForBlock,
  rewardForEra,
  rewardAtBlock,
  blocksIntoEra,
  blocksUntilNextHalving,
  nextHalvingBlock,
  totalIssuedByBlock,
  btcToSats,
  satsToBtc,
};

