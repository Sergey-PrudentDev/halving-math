'use strict';

const assert = require('assert');
const {
  eraForBlock,
  rewardForEra,
  rewardAtBlock,
  blocksIntoEra,
  blocksUntilNextHalving,
  nextHalvingBlock,
  totalIssuedByBlock,
  btcToSats,
  satsToBtc,
} = require('./index.js');

// Known historical halvings
assert.strictEqual(eraForBlock(0), 1);
assert.strictEqual(eraForBlock(209999), 1);
assert.strictEqual(eraForBlock(210000), 2);
assert.strictEqual(eraForBlock(420000), 3);
assert.strictEqual(eraForBlock(630000), 4);
assert.strictEqual(eraForBlock(840000), 5); // April 2024 halving

assert.strictEqual(rewardForEra(1), 50);
assert.strictEqual(rewardForEra(2), 25);
assert.strictEqual(rewardForEra(5), 3.125);
assert.strictEqual(rewardForEra(34), 0);

assert.strictEqual(rewardAtBlock(840000), 3.125);
assert.strictEqual(rewardAtBlock(850000), 3.125);

// Verified against real chain history: block 850,000 is 10,000 blocks
// into era 5, with 200,000 blocks left until the next halving.
assert.strictEqual(blocksIntoEra(850000), 10000);
assert.strictEqual(blocksUntilNextHalving(850000), 200000);
assert.strictEqual(nextHalvingBlock(850000), 1050000);

// Total issued by the end of era 1 should be exactly 10.5M BTC.
assert.strictEqual(totalIssuedByBlock(210000 - 1) + rewardForEra(1), 10500000);

assert.strictEqual(btcToSats(1), 100000000);
assert.strictEqual(satsToBtc(100000000), 1);

console.log('All tests passed.');

